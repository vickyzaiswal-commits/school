"use client";
import React from "react";
import Spinner from "../components/Spinner/Spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Spinner />
    </div>
  );
}
