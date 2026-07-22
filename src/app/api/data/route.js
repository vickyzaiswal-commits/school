import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// File name mappings
const fileMappings = {
  Home: "home.json",
  History: "history.json",
  VisionMission: "vision-mission.json",
  PrincipalMessage: "principal-message.json",
  Infrastructure: "infrastructure.json",
  Curriculum: "curriculum.json",
  PrePrimarySchool: "pre-primary.json",
  PrimarySchool: "primary.json",
  MiddleSchool: "middle.json",
  SeniorSchool: "senior.json",
  AdmissionProcess: "admission-process.json",
  ApplicationForm: "application-form.json",
  Fees: "fees.json",
  Footer: "footer.json",
  Sports: "sports.json",
  Arts: "arts.json",
  Music: "music.json",
  Clubs: "clubs.json",
  Competitions: "competitions.json",
  Events: "events.json",
  SchoolTimings: "school-timings.json",
  SchoolCalendar: "school-calendar.json",
  Transport: "transport.json",
  Canteen: "canteen.json",
  HouseSystem: "house-system.json",
  StudentCouncil: "student-council.json",
  Gallery: "gallery.json",
  Forms: "forms.json",
  Syllabus: "syllabus.json",
  FeeStructure: "fee-structure.json",
  Policies: "policies.json",
  ContactUs: "contact-us.json",
  Navbar: "navbar.json",
  Notice: "notice.json",
  Alumni: "alumni.json",
  Career: "career.json",
  Achievements: "achievements.json",
  Virtual_Tour: "virtual-tour.json",
  HigherEducation: "higher-education.json",
};

// Generic handler for save/get/delete operations
const handlers = {
  save_home: saveSingleRecord("Home"),
  get_all_homes: getAllRecords("Home"),
  delete_home_data: deleteRecord("Home"),

  get_all_history_data: getAllRecords("History"),
  save_history: saveSingleRecord("History"),
  delete_history_data: deleteRecord("History"),

  get_all_vision_mission_data: getAllRecords("VisionMission"),
  save_vision_mission: saveSingleRecord("VisionMission"),
  delete_vision_mission: deleteRecord("VisionMission"),

  get_all_principal_message_data: getAllRecords("PrincipalMessage"),
  save_principal_message: saveSingleRecord("PrincipalMessage"),
  delete_principal_message: deleteRecord("PrincipalMessage"),

  get_all_infrastructure_data: getAllRecords("Infrastructure"),
  save_infrastructure: saveSingleRecord("Infrastructure"),
  delete_infrastructure: deleteRecord("Infrastructure"),

  get_all_curriculum_data: getAllRecords("Curriculum"),
  save_curriculum: saveSingleRecord("Curriculum"),
  delete_curriculum: deleteRecord("Curriculum"),

  get_all_primaryschool_data: getAllRecords("PrimarySchool"),
  save_primaryschool: saveSingleRecord("PrimarySchool"),
  delete_primaryschool: deleteRecord("PrimarySchool"),

  get_all_middleschool_data: getAllRecords("MiddleSchool"),
  save_middleschool: saveSingleRecord("MiddleSchool"),
  delete_middleschool: deleteRecord("MiddleSchool"),

  get_all_seniorschool_data: getAllRecords("SeniorSchool"),
  save_seniorschool: saveSingleRecord("SeniorSchool"),
  delete_seniorschool: deleteRecord("SeniorSchool"),

  get_all_admission_data: getAllRecords("AdmissionProcess"),
  save_admission_data: saveSingleRecord("AdmissionProcess"),
  delete_admission_data: deleteRecord("AdmissionProcess"),

  get_all_application_forms: getAllRecords("ApplicationForm"),
  save_application_form: saveSingleRecord("ApplicationForm"),
  delete_application_form: deleteRecord("ApplicationForm"),

  get_all_fees_data: getAllRecords("Fees"),
  save_fees_data: saveSingleRecord("Fees"),
  delete_fees_data: deleteRecord("Fees"),

  get_all_sports_data: getAllRecords("Sports"),
  save_sports_data: saveSingleRecord("Sports"),
  delete_sports_data: deleteRecord("Sports"),

  get_all_arts_data: getAllRecords("Arts"),
  save_arts_data: saveSingleRecord("Arts"),
  delete_arts_data: deleteRecord("Arts"),

  get_all_music_data: getAllRecords("Music"),
  save_music_data: saveSingleRecord("Music"),
  delete_music_data: deleteRecord("Music"),

  get_all_clubs_data: getAllRecords("Clubs"),
  save_clubs_data: saveSingleRecord("Clubs"),
  delete_clubs_data: deleteRecord("Clubs"),

  get_all_competitions_data: getAllRecords("Competitions"),
  save_competitions_data: saveSingleRecord("Competitions"),
  delete_competitions_data: deleteRecord("Competitions"),

  get_all_events_data: getAllRecords("Events"),
  save_events_data: saveSingleRecord("Events"),
  delete_events_data: deleteRecord("Events"),

  get_all_school_timings: getAllRecords("SchoolTimings"),
  get_all_school_timings_data: getAllRecords("SchoolTimings"),
  save_school_timings: saveSingleRecord("SchoolTimings"),
  save_school_timings_data: saveSingleRecord("SchoolTimings"),
  delete_school_timings: deleteRecord("SchoolTimings"),

  get_all_school_calendar: getAllRecords("SchoolCalendar"),
  save_school_calendar: saveSingleRecord("SchoolCalendar"),
  delete_school_calendar: deleteRecord("SchoolCalendar"),

  get_all_transport_data: getAllRecords("Transport"),
  save_transport_data: saveSingleRecord("Transport"),
  delete_transport_data: deleteRecord("Transport"),

  get_all_canteen_data: getAllRecords("Canteen"),
  save_canteen_data: saveSingleRecord("Canteen"),
  delete_canteen_data: deleteRecord("Canteen"),

  get_all_house_system_data: getAllRecords("HouseSystem"),
  get_all_house_data: getAllRecords("HouseSystem"),
  save_house_system_data: saveSingleRecord("HouseSystem"),
  save_house_data: saveSingleRecord("HouseSystem"),
  delete_house_system_data: deleteRecord("HouseSystem"),

  get_all_student_council_data: getAllRecords("StudentCouncil"),
  save_student_council_data: saveSingleRecord("StudentCouncil"),
  delete_student_council_data: deleteRecord("StudentCouncil"),

  get_all_gallery_data: getAllRecords("Gallery"),
  save_gallery_data: saveSingleRecord("Gallery"),
  delete_gallery_data: deleteRecord("Gallery"),

  get_all_forms_data: getAllRecords("Forms"),
  save_forms_data: saveSingleRecord("Forms"),
  delete_forms_data: deleteRecord("Forms"),
  get_all_downloads_data: getAllRecords("Forms"),
  save_downloads_data: saveSingleRecord("Forms"),

  get_all_syllabus_data: getAllRecords("Syllabus"),
  save_syllabus_data: saveSingleRecord("Syllabus"),
  delete_syllabus_data: deleteRecord("Syllabus"),

  get_all_fee_structure: getAllRecords("FeeStructure"),
  get_all_fee_structure_data: getAllRecords("FeeStructure"),
  save_fee_structure: saveSingleRecord("FeeStructure"),
  save_fee_structure_data: saveSingleRecord("FeeStructure"),
  delete_fee_structure: deleteRecord("FeeStructure"),
  delete_fee_structure_data: deleteRecord("FeeStructure"),

  get_all_policies: getAllRecords("Policies"),
  save_policies: saveSingleRecord("Policies"),
  delete_policies: deleteRecord("Policies"),

  get_all_contact_us: getAllRecords("ContactUs"),
  save_contact_us: saveSingleRecord("ContactUs"),
  delete_contact_us: deleteRecord("ContactUs"),

  get_all_navbar: getAllRecords("Navbar"),
  save_navbar: saveSingleRecord("Navbar"),
  delete_navbar: deleteRecord("Navbar"),

  get_all_notice: getAllRecords("Notice"),
  save_notice: saveSingleRecord("Notice"),
  delete_notice: deleteRecord("Notice"),

  get_all_alumni: getAllRecords("Alumni"),
  save_alumni: saveSingleRecord("Alumni"),
  delete_alumni: deleteRecord("Alumni"),

  get_all_career: getAllRecords("Career"),
  save_career: saveSingleRecord("Career"),
  delete_career: deleteRecord("Career"),

  get_all_achievements: getAllRecords("Achievements"),
  save_achievements: saveSingleRecord("Achievements"),
  delete_achievements: deleteRecord("Achievements"),

  get_all_virtual_tour: getAllRecords("Virtual_Tour"),
  save_virtual_tour: saveSingleRecord("Virtual_Tour"),
  delete_virtual_tour: deleteRecord("Virtual_Tour"),

  get_all_higher_education: getAllRecords("HigherEducation"),
  save_higher_education: saveSingleRecord("HigherEducation"),
  delete_higher_education: deleteRecord("HigherEducation"),

  get_all_pre_primary_school: getAllRecords("PrePrimarySchool"),
  save_pre_primary_school: saveSingleRecord("PrePrimarySchool"),
  delete_pre_primary_school: deleteRecord("PrePrimarySchool"),

  get_navbar_data: getAllRecords("Navbar"),
  save_navbar_data: saveSingleRecord("Navbar"),

  get_all_footer_data: getAllRecords("Footer"),
  save_footer: saveSingleRecord("Footer"),

  get_all_notice_data: getAllRecords("Notice"),
  save_notice_data: saveSingleRecord("Notice"),
};

function saveSingleRecord(modelName) {
  return async (body) => {
    const filename = fileMappings[modelName] || `${modelName.toLowerCase()}.json`;
    const filePath = path.join(process.cwd(), "src/data", filename);
    try {
      const payload = body?.payload ?? body;
      const normalizedPayload = payload && typeof payload === "object" && payload.encrypted && payload.payload
        ? payload.payload
        : payload;
      
      // Ensure the directory exists
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      
      // Write JSON to file
      await fs.writeFile(filePath, JSON.stringify(normalizedPayload, null, 2), "utf-8");
      
      return {
        status: 200,
        message: `${modelName} saved successfully`,
        data: {
          id: 1,
          data: payload,
        },
      };
    } catch (error) {
      console.error(`Error saving ${modelName}:`, error);
      return {
        status: 500,
        message: `Failed to save ${modelName}`,
        error: error.message,
      };
    }
  };
}

function getAllRecords(modelName) {
  return async () => {
    const filename = fileMappings[modelName] || `${modelName.toLowerCase()}.json`;
    const filePath = path.join(process.cwd(), "src/data", filename);
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      const parsedPayload = JSON.parse(fileContent);
      const payload = parsedPayload && typeof parsedPayload === "object" && parsedPayload.encrypted && parsedPayload.payload
        ? parsedPayload.payload
        : parsedPayload;
      return {
        status: 200,
        message: `${modelName} retrieved successfully`,
        data: [
          {
            id: 1,
            data: payload,
          },
        ],
      };
    } catch (error) {
      console.warn(`File not found or empty for ${modelName}:`, filePath);
      return {
        status: 200,
        message: `${modelName} retrieved successfully`,
        data: [],
      };
    }
  };
}

function deleteRecord(modelName) {
  return async (body) => {
    const filename = fileMappings[modelName] || `${modelName.toLowerCase()}.json`;
    const filePath = path.join(process.cwd(), "src/data", filename);
    try {
      await fs.unlink(filePath);
      return {
        status: 200,
        message: `${modelName} deleted successfully`,
      };
    } catch (error) {
      console.warn(`Failed to delete file or file doesn't exist for ${modelName}:`, filePath);
      return {
        status: 200,
        message: `${modelName} deleted successfully`,
      };
    }
  };
}

export async function POST(request) {
  try {
    const { action, ...body } = await request.json();

    let handler = handlers[action];
    
    if (!handler && typeof action === "string") {
      let normalizedAction = action;
      
      // Strip trailing _data suffix
      if (normalizedAction.endsWith("_data")) {
        normalizedAction = normalizedAction.replace(/_data$/, "");
      }
      
      // Normalize common alias variations
      if (normalizedAction === "save_contact") normalizedAction = "save_contact_us";
      if (normalizedAction === "get_all_contact") normalizedAction = "get_all_contact_us";
      if (normalizedAction === "delete_contact") normalizedAction = "delete_contact_us";
      
      if (normalizedAction === "save_preprimary") normalizedAction = "save_pre_primary_school";
      if (normalizedAction === "get_all_preprimary") normalizedAction = "get_all_pre_primary_school";
      
      if (normalizedAction === "save_primary") normalizedAction = "save_primaryschool";
      if (normalizedAction === "get_all_primary") normalizedAction = "get_all_primaryschool";
      
      if (normalizedAction === "save_middle") normalizedAction = "save_middleschool";
      if (normalizedAction === "get_all_middle") normalizedAction = "get_all_middleschool";
      
      if (normalizedAction === "save_senior") normalizedAction = "save_seniorschool";
      if (normalizedAction === "get_all_senior") normalizedAction = "get_all_seniorschool";

      handler = handlers[normalizedAction];
    }

    if (!handler) {
      return NextResponse.json({ message: `Invalid action: ${action}` }, { status: 400 });
    }

    const result = await handler(body);

    return NextResponse.json(result, { status: result.status });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
