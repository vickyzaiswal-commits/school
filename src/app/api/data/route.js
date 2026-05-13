import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

// Table name mappings
const tableMappings = {
  Home: "home",
  History: "histories",
  VisionMission: "vision_missions",
  PrincipalMessage: "principal_messages",
  Infrastructure: "infrastructures",
  Curriculum: "curricula",
  PrePrimarySchool: "pre_primary_schools",
  PrimarySchool: "primary_schools",
  MiddleSchool: "middle_schools",
  SeniorSchool: "senior_schools",
  AdmissionProcess: "admission_processes",
  ApplicationForm: "application_forms",
  Fees: "fees",
  Sports: "sports",
  Arts: "arts",
  Music: "musics",
  Clubs: "clubs",
  Competitions: "competitions",
  Events: "events",
  SchoolTimings: "school_timings",
  SchoolCalendar: "school_calendars",
  Transport: "transports",
  Canteen: "canteens",
  HouseSystem: "house_systems",
  StudentCouncil: "student_councils",
  Gallery: "galleries",
  Forms: "forms",
  Syllabus: "syllabi",
  FeeStructure: "fee_structures",
  Policies: "policies",
  ContactUs: "contact_us",
  Navbar: "navbars",
  Notice: "notices",
  Alumni: "alumni",
  Career: "careers",
  Achievements: "achievements",
  Virtual_Tour: "virtual_tours",
  HigherEducation: "higher_educations",
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
  // Aliases for downloads frontend routes
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
  // Aliases matching frontend action names
  get_all_contact_data: getAllRecords("ContactUs"),
  save_contact_data: saveSingleRecord("ContactUs"),
  delete_contact_data: deleteRecord("ContactUs"),

  get_all_navbar: getAllRecords("Navbar"),
  save_navbar: saveSingleRecord("Navbar"),
  delete_navbar: deleteRecord("Navbar"),

  get_all_notice: getAllRecords("Notice"),
  save_notice: saveSingleRecord("Notice"),
  delete_notice: deleteRecord("Notice"),

  get_all_alumni: getAllRecords("Alumni"),
  save_alumni: saveSingleRecord("Alumni"),
  delete_alumni: deleteRecord("Alumni"),
  // Aliases matching frontend action names for alumni
  get_all_alumni_data: getAllRecords("Alumni"),
  save_alumni_data: saveSingleRecord("Alumni"),
  delete_alumni_data: deleteRecord("Alumni"),

  get_all_career: getAllRecords("Career"),
  save_career: saveSingleRecord("Career"),
  delete_career: deleteRecord("Career"),
  // Aliases matching frontend action names for careers
  get_all_career_data: getAllRecords("Career"),
  save_career_data: saveSingleRecord("Career"),
  delete_career_data: deleteRecord("Career"),

  get_all_achievements: getAllRecords("Achievements"),
  save_achievements: saveSingleRecord("Achievements"),
  delete_achievements: deleteRecord("Achievements"),
  // Aliases matching frontend action names for achievements
  get_all_achievement_data: getAllRecords("Achievements"),
  save_achievement_data: saveSingleRecord("Achievements"),
  delete_achievement_data: deleteRecord("Achievements"),

  get_all_virtual_tour: getAllRecords("Virtual_Tour"),
  save_virtual_tour: saveSingleRecord("Virtual_Tour"),
  delete_virtual_tour: deleteRecord("Virtual_Tour"),

  get_all_higher_education: getAllRecords("HigherEducation"),
  save_higher_education: saveSingleRecord("HigherEducation"),
  delete_higher_education: deleteRecord("HigherEducation"),

  get_all_pre_primary_school: getAllRecords("PrePrimarySchool"),
  save_pre_primary_school: saveSingleRecord("PrePrimarySchool"),
  delete_pre_primary_school: deleteRecord("PrePrimarySchool"),

  // Aliases for navbar (called from frontend)
  get_navbar_data: getAllRecords("Navbar"),
  save_navbar_data: saveSingleRecord("Navbar"),

  // Aliases for footer (called from frontend)
  get_all_footer_data: getAllRecords("Navbar"), // Footer uses Navbar model
  save_footer: saveSingleRecord("Navbar"),

  // Aliases for notice (called from frontend)
  get_all_notice_data: getAllRecords("Notice"),
  save_notice_data: saveSingleRecord("Notice"),
};

function saveSingleRecord(modelName) {
  return async (body) => {
    const table = tableMappings[modelName];
    if (!table) {
      return {
        status: 500,
        message: `Table mapping not found for ${modelName}`,
      };
    }
    try {
      const { payload } = body;
      // Check if record exists
      const { data: existing, error: selectError } = await supabase
        .from(table)
        .select("id")
        .limit(1);
      if (selectError && selectError.code !== "PGRST116") {
        throw selectError;
      }
      const exists = existing && existing.length > 0;
      if (exists) {
        const { data, error } = await supabase
          .from(table)
          .update({ data: payload })
          .eq("id", existing[0].id)
          .select()
          .single();
        if (error) throw error;
        return {
          status: 200,
          message: `${modelName} saved successfully`,
          data,
        };
      } else {
        const { data, error } = await supabase
          .from(table)
          .insert({ data: payload })
          .select()
          .single();
        if (error) throw error;
        return {
          status: 200,
          message: `${modelName} saved successfully`,
          data,
        };
      }
    } catch (error) {
      console.error(`Error saving ${modelName}:`, error);
      return {
        status: 500,
        message: `Failed to save ${modelName}`,
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      };
    }
  };
}

function getAllRecords(modelName) {
  return async () => {
    const table = tableMappings[modelName];
    if (!table) {
      return {
        status: 500,
        message: `Table mapping not found for ${modelName}`,
      };
    }
    try {
      const { data, error } = await supabase.from(table).select("*");
      if (error) throw error;
      return {
        status: 200,
        message: `${modelName} retrieved successfully`,
        data,
      };
    } catch (error) {
      console.error(`Error retrieving ${modelName}:`, error);
      const debugApi = process.env.DEBUG_API === "true";
      return {
        status: 500,
        message: `Failed to retrieve ${modelName}`,
        error: debugApi
          ? `${error.message}` + (error.stack ? `\n${error.stack}` : "")
          : undefined,
      };
    }
  };
}

function deleteRecord(modelName) {
  return async (body) => {
    const table = tableMappings[modelName];
    if (!table) {
      return {
        status: 500,
        message: `Table mapping not found for ${modelName}`,
      };
    }
    try {
      const { id } = body;
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      return {
        status: 200,
        message: `${modelName} deleted successfully`,
      };
    } catch (error) {
      console.error(`Error deleting ${modelName}:`, error);
      return {
        status: 500,
        message: `Failed to delete ${modelName}`,
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      };
    }
  };
}

export async function POST(request) {
  try {
    const { action, ...body } = await request.json();

    if (!handlers[action]) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    const handler = handlers[action];
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
