import { NextResponse } from 'next/server';
import db from '@/lib/models';
import bcrypt from 'bcryptjs';

const FAILED_LOGINS = new Map();
const MAX_ATTEMPTS = 5;
const LOCK_TIME_MS = 15 * 60 * 1000;
const DUMMY_HASH = bcrypt.hashSync("invalid_password_for_timing", 10);

function recordFailedAttempt(key) {
    const now = Date.now();
    const entry = FAILED_LOGINS.get(key) || { count: 0, first: now, lockUntil: 0 };
    if (entry.lockUntil && entry.lockUntil > now) {
        FAILED_LOGINS.set(key, entry);
        return entry;
    }
    if (now - entry.first > LOCK_TIME_MS) {
        entry.count = 1;
        entry.first = now;
        entry.lockUntil = 0;
    } else {
        entry.count += 1;
        if (entry.count >= MAX_ATTEMPTS) {
            entry.lockUntil = now + LOCK_TIME_MS;
        }
    }
    FAILED_LOGINS.set(key, entry);
    return entry;
}

function clearFailedAttempts(key) {
    FAILED_LOGINS.delete(key);
}

export async function POST(request) {
  try {
    const { action, ...body } = await request.json();

    if (action === 'sign_up') {
      return await handleSignUp(body);
    } else if (action === 'login') {
      return await handleLogin(body);
    } else {
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

async function handleSignUp(body) {
  try {
    const { name, email, password, role } = body;
    
    if (!password) {
      return NextResponse.json({ message: "Password is required" }, { status: 400 });
    }

    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const userObj = newUser.toJSON();
    delete userObj.password;

    return NextResponse.json(
      { message: "User registered successfully", user: userObj },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during sign up:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

async function handleLogin(body) {
  try {
    const { email, password } = body || {};

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const emailNormalized = email.trim().toLowerCase();

    const entry = FAILED_LOGINS.get(emailNormalized);
    if (entry && entry.lockUntil && entry.lockUntil > Date.now()) {
      return NextResponse.json({ message: "Too many failed attempts. Try again later." }, { status: 429 });
    }

    const user = await db.User.findOne({ where: { email: emailNormalized } });

    if (!user) {
      await bcrypt.compare(password, DUMMY_HASH);
      recordFailedAttempt(emailNormalized);
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const updated = recordFailedAttempt(emailNormalized);
      if (updated.lockUntil && updated.lockUntil > Date.now()) {
        return NextResponse.json({ message: "Too many failed attempts. Try again later." }, { status: 429 });
      }
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    clearFailedAttempts(emailNormalized);
    const userObj = user.toJSON();
    delete userObj.email;
    delete userObj.password;

    return NextResponse.json(
      { message: "Login successful", status: 200, user: userObj },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
