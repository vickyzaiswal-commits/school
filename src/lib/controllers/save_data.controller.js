const { where } = require("sequelize");
const db = require("../models");

// Fix in save.controller.js
exports.save_home = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a home record exists
    const existingHome = await db.Home.findOne();

    let home_data;
    if (existingHome) {
      // Update existing record
      await existingHome.update({ data: payload });
      home_data = existingHome;
    } else {
      // Create new record
      home_data = await db.Home.create({ data: payload });
    }

    return res.status(201).json({
      status: 201,
      message: "Data saved successfully",
      data: home_data,
    });
  } catch (error) {
    console.error("Error saving home data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save home data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_homes = async (req, res) => {
  try {
    const homes = await db.Home.findAll();
    return res.status(200).json({
      status: 200,
      message: "Homes retrieved successfully",
      data: homes,
    });
  } catch (error) {
    console.error("Error retrieving homes:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve homes",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.delete_home_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Home.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Home not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Home deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting home data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete home data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_history_data = async (req, res) => {
  try {
    const history = await db.History.findAll();
    return res.status(200).json({
      status: 200,
      message: "History retrieved successfully",
      data: history,
    });
  } catch (error) {
    console.error("Error retrieving history:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve history",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.save_history = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a history record exists
    const existingHistory = await db.History.findOne();

    let history_data;
    if (existingHistory) {
      // Update existing record
      await existingHistory.update({ data: payload });
      history_data = existingHistory;
    } else {
      // Create new record
      history_data = await db.History.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "History saved successfully",
      data: history_data,
    });
  } catch (error) {
    console.error("Error saving history data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save history data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.delete_history_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.History.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "History not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "History deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting history data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete history data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_vision_mission_data = async (req, res) => {
  try {
    const vm = await db.VisionMission.findAll();
    return res.status(200).json({
      status: 200,
      message: "Vision Mission retrieved successfully",
      data: vm,
    });
  } catch (error) {
    console.error("Error retrieving vision mission:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve vision mission",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.save_vision_mission = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a vision mission record exists
    const existingVM = await db.VisionMission.findOne();

    let vm_data;
    if (existingVM) {
      // Update existing record
      await existingVM.update({ data: payload });
      vm_data = existingVM;
    } else {
      // Create new record
      vm_data = await db.VisionMission.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Vision Mission saved successfully",
      data: vm_data,
    });
  } catch (error) {
    console.error("Error saving vision mission data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save vision mission data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.delete_vision_mission = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.VisionMission.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Vision Mission not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Vision Mission deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting vision mission data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete vision mission data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_principal_message_data = async (req, res) => {
  try {
    const pm = await db.PrincipalMessage.findAll();
    return res.status(200).json({
      status: 200,
      message: "Principal Message retrieved successfully",
      data: pm,
    });
  } catch (error) {
    console.error("Error retrieving principal message:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve principal message",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.save_principal_message = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a principal message record exists
    const existingPM = await db.PrincipalMessage.findOne();

    let pm_data;
    if (existingPM) {
      // Update existing record
      await existingPM.update({ data: payload });
      pm_data = existingPM;
    } else {
      // Create new record
      pm_data = await db.PrincipalMessage.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Principal Message saved successfully",
      data: pm_data,
    });
  } catch (error) {
    console.error("Error saving principal message data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save principal message data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.delete_principal_message = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.PrincipalMessage.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Principal Message not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Principal Message deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting principal message data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete principal message data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_infrastructure_data = async (req, res) => {
  try {
    const infra = await db.Infrastructure.findAll();
    return res.status(200).json({
      status: 200,
      message: "Infrastructure retrieved successfully",
      data: infra,
    });
  } catch (error) {
    console.error("Error retrieving infrastructure:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve infrastructure",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.save_infrastructure = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if an infrastructure record exists
    const existingInfra = await db.Infrastructure.findOne();

    let infra_data;
    if (existingInfra) {
      // Update existing record
      await existingInfra.update({ data: payload });
      infra_data = existingInfra;
    } else {
      // Create new record
      infra_data = await db.Infrastructure.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Infrastructure saved successfully",
      data: infra_data,
    });
  } catch (error) {
    console.error("Error saving infrastructure data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save infrastructure data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.delete_infrastructure = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Infrastructure.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Infrastructure not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Infrastructure deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting infrastructure data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete infrastructure data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_curriculum_data = async (req, res) => {
  try {
    const curriculum = await db.Curriculum.findAll();
    return res.status(200).json({
      status: 200,
      message: "Curriculum retrieved successfully",
      data: curriculum,
    });
  } catch (error) {
    console.error("Error retrieving curriculum:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve curriculum",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_curriculum = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a curriculum record exists
    const existingCurriculum = await db.Curriculum.findOne();

    let curriculum_data;
    if (existingCurriculum) {
      // Update existing record
      await existingCurriculum.update({ data: payload });
      curriculum_data = existingCurriculum;
    } else {
      // Create new record
      curriculum_data = await db.Curriculum.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Curriculum saved successfully",
      data: curriculum_data,
    });
  } catch (error) {
    console.error("Error saving curriculum data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save curriculum data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_curriculum = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Curriculum.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Curriculum not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Curriculum deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting curriculum data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete curriculum data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_primaryschool_data = async (req, res) => {
  try {
    const primarySchool = await db.PrimarySchool.findAll();
    return res.status(200).json({
      status: 200,
      message: "Primary School data retrieved successfully",
      data: primarySchool,
    });
  } catch (error) {
    console.error("Error retrieving Primary School data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Primary School data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_primaryschool = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a Primary School record exists
    const existingPrimarySchool = await db.PrimarySchool.findOne();

    let primarySchool_data;
    if (existingPrimarySchool) {
      // Update existing record
      await existingPrimarySchool.update({ data: payload });
      primarySchool_data = existingPrimarySchool;
    } else {
      // Create new record
      primarySchool_data = await db.PrimarySchool.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Primary School saved successfully",
      data: primarySchool_data,
    });
  } catch (error) {
    console.error("Error saving Primary School data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Primary School data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.delete_primaryschool = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.PrimarySchool.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Primary School not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Primary School deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Primary School data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Primary School data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_middleschool_data = async (req, res) => {
  try {
    const middleSchool = await db.MiddleSchool.findAll();
    return res.status(200).json({
      status: 200,
      message: "Middle School data retrieved successfully",
      data: middleSchool,
    });
  } catch (error) {
    console.error("Error retrieving Middle School data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Middle School data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.save_middleschool = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a Middle School record exists
    const existingMiddleSchool = await db.MiddleSchool.findOne();

    let middleSchool_data;
    if (existingMiddleSchool) {
      // Update existing record
      await existingMiddleSchool.update({ data: payload });
      middleSchool_data = existingMiddleSchool;
    } else {
      // Create new record
      middleSchool_data = await db.MiddleSchool.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Middle School saved successfully",
      data: middleSchool_data,
    });
  } catch (error) {
    console.error("Error saving Middle School data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Middle School data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_middleschool = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.MiddleSchool.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Middle School not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Middle School deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Middle School data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Middle School data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_seniorschool_data = async (req, res) => {
  try {
    const seniorSchool = await db.SeniorSchool.findAll();
    return res.status(200).json({
      status: 200,
      message: "Senior School data retrieved successfully",
      data: seniorSchool,
    });
  } catch (error) {
    console.error("Error retrieving Senior School data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Senior School data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_seniorschool = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a Senior School record exists
    const existingSeniorSchool = await db.SeniorSchool.findOne();

    let seniorSchool_data;
    if (existingSeniorSchool) {
      // Update existing record
      await existingSeniorSchool.update({ data: payload });
      seniorSchool_data = existingSeniorSchool;
    } else {
      // Create new record
      seniorSchool_data = await db.SeniorSchool.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Senior School saved successfully",
      data: seniorSchool_data,
    });
  } catch (error) {
    console.error("Error saving Senior School data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Senior School data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_seniorschool = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.SeniorSchool.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Senior School not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Senior School deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Senior School data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Senior School data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_admission_data = async (req, res) => {
  try {
    const admissionProcess = await db.AdmissionProcess.findAll();
    return res.status(200).json({
      status: 200,
      message: "Admission Process data retrieved successfully",
      data: admissionProcess,
    });
  } catch (error) {
    console.error("Error retrieving Admission Process data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Admission Process data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_admission_data = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if an Admission Process record exists
    const existingAdmissionProcess = await db.AdmissionProcess.findOne();

    let admissionProcess_data;
    if (existingAdmissionProcess) {
      // Update existing record
      await existingAdmissionProcess.update({ data: payload });
      admissionProcess_data = existingAdmissionProcess;
    } else {
      // Create new record
      admissionProcess_data = await db.AdmissionProcess.create({
        Data: payload,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Admission Process saved successfully",
      data: admissionProcess_data,
    });
  } catch (error) {
    console.error("Error saving Admission Process data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Admission Process data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_admission_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.AdmissionProcess.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Admission Process not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Admission Process deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Admission Process data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Admission Process data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_application_forms = async (req, res) => {
  try {
    const applicationForm = await db.ApplicationForm.findAll();
    return res.status(200).json({
      status: 200,
      message: "Application Form data retrieved successfully",
      data: applicationForm,
    });
  } catch (error) {
    console.error("Error retrieving Application Form data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Application Form data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_application_form = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if an Application Form record exists
    const existingApplicationForm = await db.ApplicationForm.findOne();

    let applicationForm_data;
    if (existingApplicationForm) {
      // Update existing record
      await existingApplicationForm.update({ data: payload });
      applicationForm_data = existingApplicationForm;
    } else {
      // Create new record
      applicationForm_data = await db.ApplicationForm.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Application Form saved successfully",
      data: applicationForm_data,
    });
  } catch (error) {
    console.error("Error saving Application Form data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Application Form data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_application_form = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.ApplicationForm.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Application Form not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Application Form deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Application Form data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Application Form data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_fees_data = async (req, res) => {
  try {
    const fees = await db.Fees.findAll();
    return res.status(200).json({
      status: 200,
      message: "Fees data retrieved successfully",
      data: fees,
    });
  } catch (error) {
    console.error("Error retrieving Fees data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Fees data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_fees_data = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a Fees record exists
    const existingFees = await db.Fees.findOne();

    let fees_data;
    if (existingFees) {
      // Update existing record
      await existingFees.update({ data: payload });
      fees_data = existingFees;
    } else {
      // Create new record
      fees_data = await db.Fees.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Fees saved successfully",
      data: fees_data,
    });
  } catch (error) {
    console.error("Error saving Fees data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Fees data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_fees = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Fees.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Fees not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Fees deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Fees data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Fees data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_sports_data = async (req, res) => {
  try {
    const sports = await db.Sports.findAll();
    return res.status(200).json({
      status: 200,
      message: "Sports data retrieved successfully",
      data: sports,
    });
  } catch (error) {
    console.error("Error retrieving Sports data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Sports data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_sports_data = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a Sports record exists
    const existingSports = await db.Sports.findOne();

    let sports_data;
    if (existingSports) {
      // Update existing record
      await existingSports.update({ data: payload });
      sports_data = existingSports;
    } else {
      // Create new record
      sports_data = await db.Sports.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Sports saved successfully",
      data: sports_data,
    });
  } catch (error) {
    console.error("Error saving Sports data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Sports data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_sports = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Sports.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Sports not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Sports deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Sports data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Sports data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_arts_data = async (req, res) => {
  try {
    const arts = await db.Arts.findAll();
    return res.status(200).json({
      status: 200,
      message: "Arts data retrieved successfully",
      data: arts,
    });
  } catch (error) {
    console.error("Error retrieving Arts data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Arts data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_arts_data = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if an Arts record exists
    const existingArts = await db.Arts.findOne();

    let arts_data;
    if (existingArts) {
      // Update existing record
      await existingArts.update({ data: payload });
      arts_data = existingArts;
    } else {
      // Create new record
      arts_data = await db.Arts.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Arts saved successfully",
      data: arts_data,
    });
  } catch (error) {
    console.error("Error saving Arts data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Arts data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_arts = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Arts.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Arts not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Arts deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Arts data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Arts data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_music_data = async (req, res) => {
  try {
    const music = await db.Music.findAll();
    return res.status(200).json({
      status: 200,
      message: "Music data retrieved successfully",
      data: music,
    });
  } catch (error) {
    console.error("Error retrieving Music data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Music data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_music_data = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a Music record exists
    const existingMusic = await db.Music.findOne();

    let music_data;
    if (existingMusic) {
      // Update existing record
      await existingMusic.update({ data: payload });
      music_data = existingMusic;
    } else {
      // Create new record
      music_data = await db.Music.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Music saved successfully",
      data: music_data,
    });
  } catch (error) {
    console.error("Error saving Music data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Music data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_music = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Music.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Music not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Music deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Music data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Music data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_clubs_data = async (req, res) => {
  try {
    const clubs = await db.Clubs.findAll();
    return res.status(200).json({
      status: 200,
      message: "Clubs data retrieved successfully",
      data: clubs,
    });
  } catch (error) {
    console.error("Error retrieving Clubs data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Clubs data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_clubs_data = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a Clubs record exists
    const existingClubs = await db.Clubs.findOne();

    let clubs_data;
    if (existingClubs) {
      // Update existing record
      await existingClubs.update({ data: payload });
      clubs_data = existingClubs;
    } else {
      // Create new record
      clubs_data = await db.Clubs.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Clubs saved successfully",
      data: clubs_data,
    });
  } catch (error) {
    console.error("Error saving Clubs data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Clubs data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_clubs = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Clubs.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Clubs not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Clubs deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Clubs data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Clubs data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_competitions_data = async (req, res) => {
  try {
    const competitions = await db.Competitions.findAll();
    return res.status(200).json({
      status: 200,
      message: "Competitions data retrieved successfully",
      data: competitions,
    });
  } catch (error) {
    console.error("Error retrieving Competitions data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Competitions data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_competitions_data = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a Competitions record exists
    const existingCompetitions = await db.Competitions.findOne();

    let competitions_data;
    if (existingCompetitions) {
      // Update existing record
      await existingCompetitions.update({ data: payload });
      competitions_data = existingCompetitions;
    } else {
      // Create new record
      competitions_data = await db.Competitions.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Competitions saved successfully",
      data: competitions_data,
    });
  } catch (error) {
    console.error("Error saving Competitions data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Competitions data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.delete_competitions = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Competitions.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Competitions not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Competitions deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Competitions data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Competitions data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_events_data = async (req, res) => {
  try {
    const events = await db.Events.findAll();
    return res.status(200).json({
      status: 200,
      message: "Events data retrieved successfully",
      data: events,
    });
  } catch (error) {
    console.error("Error retrieving Events data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Events data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_events_data = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if an Events record exists
    const existingEvents = await db.Events.findOne();

    let events_data;
    if (existingEvents) {
      // Update existing record
      await existingEvents.update({ data: payload });
      events_data = existingEvents;
    } else {
      // Create new record
      events_data = await db.Events.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Events saved successfully",
      data: events_data,
    });
  } catch (error) {
    console.error("Error saving Events data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Events data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_events = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Events.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Events not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Events deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Events data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Events data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_timings_data = async (req, res) => {
  try {
    const timings = await db.SchoolTimings.findAll();
    return res.status(200).json({
      status: 200,
      message: "School timings data retrieved successfully",
      data: timings,
    });
  } catch (error) {
    console.error("Error retrieving School timings data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve School timings data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_timings_data = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a SchoolTimings record exists
    const existingTimings = await db.SchoolTimings.findOne();

    let timings_data;
    if (existingTimings) {
      // Update existing record
      await existingTimings.update({ data: payload });
      timings_data = existingTimings;
    } else {
      // Create new record
      timings_data = await db.SchoolTimings.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "School timings saved successfully",
      data: timings_data,
    });
  } catch (error) {
    console.error("Error saving School timings data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save School timings data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_timings = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.SchoolTimings.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "School timings not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "School timings deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting School timings data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete School timings data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_calendar_data = async (req, res) => {
  try {
    const calendar = await db.SchoolCalendar.findAll();
    return res.status(200).json({
      status: 200,
      message: "School calendar data retrieved successfully",
      data: calendar,
    });
  } catch (error) {
    console.error("Error retrieving School calendar data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve School calendar data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_calendar_data = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a SchoolCalendar record exists
    const existingCalendar = await db.SchoolCalendar.findOne();

    let calendar_data;
    if (existingCalendar) {
      // Update existing record
      await existingCalendar.update({ data: payload });
      calendar_data = existingCalendar;
    } else {
      // Create new record
      calendar_data = await db.SchoolCalendar.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "School calendar saved successfully",
      data: calendar_data,
    });
  } catch (error) {
    console.error("Error saving School calendar data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save School calendar data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_calendar = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.SchoolCalendar.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "School calendar not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "School calendar deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting School calendar data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete School calendar data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_transport_data = async (req, res) => {
  try {
    const transport = await db.Transport.findAll();
    return res.status(200).json({
      status: 200,
      message: "Transport data retrieved successfully",
      data: transport,
    });
  } catch (error) {
    console.error("Error retrieving Transport data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Transport data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_transport_data = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a Transport record exists
    const existingTransport = await db.Transport.findOne();

    let transport_data;
    if (existingTransport) {
      // Update existing record
      await existingTransport.update({ data: payload });
      transport_data = existingTransport;
    } else {
      // Create new record
      transport_data = await db.Transport.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Transport data saved successfully",
      data: transport_data,
    });
  } catch (error) {
    console.error("Error saving Transport data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Transport data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_transport = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Transport.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Transport not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Transport deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Transport data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Transport data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_canteen_data = async (req, res) => {
  try {
    const canteen = await db.Canteen.findAll();
    return res.status(200).json({
      status: 200,
      message: "Canteen data retrieved successfully",
      data: canteen,
    });
  } catch (error) {
    console.error("Error retrieving Canteen data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Canteen data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_canteen_data = async (req, res) => {
  try {
    const { payload } = req.body;
    // Check if a Canteen record exists
    const existingCanteen = await db.Canteen.findOne();
    let canteen_data;
    if (existingCanteen) {
      // Update existing record
      await existingCanteen.update({ data: payload });
      canteen_data = existingCanteen;
    } else {
      // Create new record
      canteen_data = await db.Canteen.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Canteen data saved successfully",
      data: canteen_data,
    });
  } catch (error) {
    console.error("Error saving Canteen data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Canteen data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_canteen = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Canteen.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Canteen not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Canteen deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Canteen data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Canteen data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_house_data = async (req, res) => {
  try {
    const house = await db.HouseSystem.findAll();
    return res.status(200).json({
      status: 200,
      message: "House data retrieved successfully",
      data: house,
    });
  } catch (error) {
    console.error("Error retrieving House data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve House data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_house_data = async (req, res) => {
  try {
    const { payload } = req.body;
    // Check if a House record exists
    const existingHouse = await db.HouseSystem.findOne();
    let house_data;
    if (existingHouse) {
      // Update existing record
      await existingHouse.update({ data: payload });
      house_data = existingHouse;
    } else {
      // Create new record
      house_data = await db.HouseSystem.create({ data: payload });
    }
    return res.status(200).json({
      status: 200,
      message: "House data saved successfully",
      data: house_data,
    });
  } catch (error) {
    console.error("Error saving House data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save House data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_house_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.HouseSystem.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "House not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "House deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting House data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete House data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_student_council_data = async (req, res) => {
  try {
    const studentCouncil = await db.StudentCouncil.findAll();
    return res.status(200).json({
      status: 200,
      message: "Student Council data retrieved successfully",
      data: studentCouncil,
    });
  } catch (error) {
    console.error("Error retrieving Student Council data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Student Council data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_student_council_data = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a StudentCouncil record exists
    const existingStudentCouncil = await db.StudentCouncil.findOne();
    let studentCouncil_data;
    if (existingStudentCouncil) {
      // Update existing record
      await existingStudentCouncil.update({ data: payload });
      studentCouncil_data = existingStudentCouncil;
    } else {
      // Create new record
      studentCouncil_data = await db.StudentCouncil.create({ data: payload });
    }
    return res.status(200).json({
      status: 200,
      message: "Student Council data saved successfully",
      data: studentCouncil_data,
    });
  } catch (error) {
    console.error("Error saving Student Council data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Student Council data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_student_council_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.StudentCouncil.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Student Council not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Student Council deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Student Council data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Student Council data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_gallery_data = async (req, res) => {
  try {
    const gallery = await db.Gallery.findAll();
    return res.status(200).json({
      status: 200,
      message: "Gallery data retrieved successfully",
      data: gallery,
    });
  } catch (error) {
    console.error("Error retrieving Gallery data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Gallery data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_gallery_data = async (req, res) => {
  try {
    const { payload } = req.body;

    // Check if a Gallery record exists
    const existingGallery = await db.Gallery.findOne();
    let gallery_data;
    if (existingGallery) {
      // Update existing record
      await existingGallery.update({ data: payload });
      gallery_data = existingGallery;
    } else {
      // Create new record
      gallery_data = await db.Gallery.create({ data: payload });
    }
    return res.status(200).json({
      status: 200,
      message: "Gallery data saved successfully",
      data: gallery_data,
    });
  } catch (error) {
    console.error("Error saving Gallery data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Gallery data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_gallery_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Gallery.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Gallery not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Gallery deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Gallery data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Gallery data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_downloads_data = async (req, res) => {
  try {
    const forms = await db.Forms.findAll();
    return res.status(200).json({
      status: 200,
      message: "Forms data retrieved successfully",
      data: forms,
    });
  } catch (error) {
    console.error("Error retrieving Forms data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Forms data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_forms_data = async (req, res) => {
  try {
    const { payload } = req.body;
    // Check if a Forms record exists
    const existingForms = await db.Forms.findOne();
    let forms_data;
    if (existingForms) {
      // Update existing record
      await existingForms.update({ data: payload });
      forms_data = existingForms;
    } else {
      // Create new record
      forms_data = await db.Forms.create({ data: payload });
    }
    return res.status(200).json({
      status: 200,
      message: "Forms data saved successfully",
      data: forms_data,
    });
  } catch (error) {
    console.error("Error saving Forms data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Forms data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_forms_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Forms.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Forms not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Forms deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Forms data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Forms data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_syllabus_data = async (req, res) => {
  try {
    const syllabus = await db.Syllabus.findAll();
    return res.status(200).json({
      status: 200,
      message: "Syllabus data retrieved successfully",
      data: syllabus,
    });
  } catch (error) {
    console.error("Error retrieving Syllabus data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Syllabus data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_syllabus_data = async (req, res) => {
  try {
    const { payload } = req.body;
    // Check if a Syllabus record exists
    const existingSyllabus = await db.Syllabus.findOne();
    let syllabus_data;
    if (existingSyllabus) {
      // Update existing record
      await existingSyllabus.update({ data: payload });
      syllabus_data = existingSyllabus;
    } else {
      // Create new record
      syllabus_data = await db.Syllabus.create({ data: payload });
    }
    return res.status(200).json({
      status: 200,
      message: "Syllabus data saved successfully",
      data: syllabus_data,
    });
  } catch (error) {
    console.error("Error saving Syllabus data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Syllabus data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_syllabus_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Syllabus.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Syllabus not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Syllabus deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Syllabus data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Syllabus data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_fee_structure_data = async (req, res) => {
  try {
    const feeStructure = await db.FeeStructure.findAll();
    return res.status(200).json({
      status: 200,
      message: "Fee Structure data retrieved successfully",
      data: feeStructure,
    });
  } catch (error) {
    console.error("Error retrieving Fee Structure data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Fee Structure data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_fee_structure_data = async (req, res) => {
  try {
    const { payload } = req.body;
    // Check if a FeeStructure record exists
    const existingFeeStructure = await db.FeeStructure.findOne();
    let feeStructure_data;
    if (existingFeeStructure) {
      // Update existing record
      await existingFeeStructure.update({ data: payload });
      feeStructure_data = existingFeeStructure;
    } else {
      // Create new record
      feeStructure_data = await db.FeeStructure.create({ data: payload });
    }
    return res.status(200).json({
      status: 200,
      message: "Fee Structure data saved successfully",
      data: feeStructure_data,
    });
  } catch (error) {
    console.error("Error saving Fee Structure data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Fee Structure data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_fee_structure_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.FeeStructure.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Fee Structure not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Fee Structure deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Fee Structure data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Fee Structure data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_policy_data = async (req, res) => {
  try {
    const policy = await db.Policies.findAll();
    return res.status(200).json({
      status: 200,
      message: "Policies data retrieved successfully",
      data: policy,
    });
  } catch (error) {
    console.error("Error retrieving Policies data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Policies data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_policy_data = async (req, res) => {
  try {
    const { payload } = req.body;
    // Check if a Policies record exists
    const existingPolicy = await db.Policies.findOne();
    let policy_data;
    if (existingPolicy) {
      // Update existing record
      await existingPolicy.update({ data: payload });
      policy_data = existingPolicy;
    } else {
      // Create new record
      policy_data = await db.Policies.create({ data: payload });
    }
    return res.status(200).json({
      status: 200,
      message: "Policies data saved successfully",
      data: policy_data,
    });
  } catch (error) {
    console.error("Error saving Policies data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Policies data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_policy_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Policies.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Policies not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Policies deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Policies data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Policies data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_contact_us_data = async (req, res) => {
  try {
    const contactUs = await db.ContactUs.findAll();
    return res.status(200).json({
      status: 200,
      message: "Contact Us data retrieved successfully",
      data: contactUs,
    });
  } catch (error) {
    console.error("Error retrieving Contact Us data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Contact Us data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.save_contact_us_data = async (req, res) => {
  try {
    const { payload } = req.body;
    // Check if a ContactUs record exists
    const existingContactUs = await db.ContactUs.findOne();
    let contactUs_data;
    if (existingContactUs) {
      // Update existing record
      await existingContactUs.update({ data: payload });
      contactUs_data = existingContactUs;
    } else {
      // Create new record
      contactUs_data = await db.ContactUs.create({ data: payload });
    }
    return res.status(200).json({
      status: 200,
      message: "Contact Us data saved successfully",
      data: contactUs_data,
    });
  } catch (error) {
    console.error("Error saving Contact Us data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Contact Us data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.delete_contact_us_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.ContactUs.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Contact Us not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Contact Us deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Contact Us data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Contact Us data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_navbar_data = async (req, res) => {
  try {
    const navbar = await db.Navbar.findAll();
    return res.status(200).json({
      status: 200,
      message: "Navbar data retrieved successfully",
      data: navbar,
    });
  } catch (error) {
    console.error("Error retrieving Navbar data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Navbar data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_navbar_data = async (req, res) => {
  try {
    const { payload } = req.body;
    // Check if a Navbar record exists
    const existingNavbar = await db.Navbar.findOne();
    let navbar_data;
    if (existingNavbar) {
      // Update existing record
      await existingNavbar.update({ data: payload });
      navbar_data = existingNavbar;
    } else {
      // Create new record
      navbar_data = await db.Navbar.create({ data: payload });
    }
    return res.status(200).json({
      status: 200,
      message: "Navbar data saved successfully",
      data: navbar_data,
    });
  } catch (error) {
    console.error("Error saving Navbar data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Navbar data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_navbar_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Navbar.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Navbar not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Navbar deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Navbar data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Navbar data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_notice_data = async (req, res) => {
  try {
    const notice = await db.Notice.findAll();
    return res.status(200).json({
      status: 200,
      message: "Notice data retrieved successfully",
      data: notice,
    });
  } catch (error) {
    console.error("Error retrieving Notice data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Notice data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_notice_data = async (req, res) => {
  try {
    const { payload } = req.body;
    // Check if a Notice record exists
    const existingNotice = await db.Notice.findOne();
    let notice_data;
    if (existingNotice) {
      // Update existing record
      await existingNotice.update({ data: payload });
      notice_data = existingNotice;
    } else {
      // Create new record
      notice_data = await db.Notice.create({ data: payload });
    }
    return res.status(200).json({
      status: 200,
      message: "Notice data saved successfully",
      data: notice_data,
    });
  } catch (error) {
    console.error("Error saving Notice data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Notice data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_notice_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Notice.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Notice not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Notice deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Notice data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Notice data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_alumni_data = async (req, res) => {
  try {
    const alumni = await db.Alumni.findAll();
    return res.status(200).json({
      status: 200,
      message: "Alumni data retrieved successfully",
      data: alumni,
    });
  } catch (error) {
    console.error("Error retrieving Alumni data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Alumni data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_alumni_data = async (req, res) => {
  try {
    const { payload } = req.body;
    // Check if an Alumni record exists
    const existingAlumni = await db.Alumni.findOne();
    let alumni_data;
    if (existingAlumni) {
      // Update existing record
      await existingAlumni.update({ data: payload });
      alumni_data = existingAlumni;
    } else {
      // Create new record
      alumni_data = await db.Alumni.create({ data: payload });
    }
    return res.status(200).json({
      status: 200,
      message: "Alumni data saved successfully",
      data: alumni_data,
    });
  } catch (error) {
    console.error("Error saving Alumni data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Alumni data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_alumni_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Alumni.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Alumni not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Alumni deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Alumni data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Alumni data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_career_data = async (req, res) => {
  try {
    const career = await db.Career.findAll();
    return res.status(200).json({
      status: 200,
      message: "Career data retrieved successfully",
      data: career,
    });
  } catch (error) {
    console.error("Error retrieving Career data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Career data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_career_data = async (req, res) => {
  try {
    const { payload } = req.body;
    // Check if a Career record exists
    const existingCareer = await db.Career.findOne();
    let career_data;
    if (existingCareer) {
      // Update existing record
      await existingCareer.update({ data: payload });
      career_data = existingCareer;
    } else {
      // Create new record
      career_data = await db.Career.create({ data: payload });
    }
    return res.status(200).json({
      status: 200,
      message: "Career data saved successfully",
      data: career_data,
    });
  } catch (error) {
    console.error("Error saving Career data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Career data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_career_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Career.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Career not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Career deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Career data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Career data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_achievement_data = async (req, res) => {
  try {
    const achievement = await db.Achievements.findAll();
    return res.status(200).json({
      status: 200,
      message: "Achievements data retrieved successfully",
      data: achievement,
    });
  } catch (error) {
    console.error("Error retrieving Achievements data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Achievements data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_achievement_data = async (req, res) => {
  try {
    const { payload } = req.body;
    // Check if an Achievements record exists
    const existingAchievement = await db.Achievements.findOne();
    let achievement_data;
    if (existingAchievement) {
      // Update existing record
      await existingAchievement.update({ data: payload });
      achievement_data = existingAchievement;
    } else {
      // Create new record
      achievement_data = await db.Achievements.create({ data: payload });
    }
    return res.status(200).json({
      status: 200,
      message: "Achievements data saved successfully",
      data: achievement_data,
    });
  } catch (error) {
    console.error("Error saving Achievements data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Achievements data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_achievement_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Achievements.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Achievements not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Achievements deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Achievements data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Achievements data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_virtual_tour = async (req, res) => {
  try {
    const virtual = await db.Virtual_Tour.findAll();
    return res.status(200).json({
      status: 200,
      message: "data retrieved successfully",
      data: virtual,
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_virtual_data = async (req, res) => {
  try {
    const { payload } = req.body;

    if (!payload) {
      return res.status(400).json({
        status: 400,
        message: "Payload is required",
      });
    }

    let virtual_data;

    // Check if a record already exists
    const existingVirtual = await db.Virtual_Tour.findOne();

    if (existingVirtual) {
      // Update the existing record
      await existingVirtual.update({ data: payload });

      // Reload to get fresh data (including updatedAt, etc.)
      await existingVirtual.reload();
      virtual_data = existingVirtual;
    } else {
      // Create new record
      virtual_data = await db.Virtual_Tour.create({ data: payload });
    }

    return res.status(200).json({
      status: 200,
      message: "Virtual tour data saved successfully",
      data: virtual_data,
    });
  } catch (error) {
    console.error("SAVE VIRTUAL DATA ERROR 👉", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save data",
      error: error.message, // 👈 temporarily expose
    });
  }
};
exports.delete_virtual_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.Virtual_Tour.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Data deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.get_all_highereducation_data = async (req, res) => {
  try {
    const higherEducation = await db.HigherEducation.findAll();
    return res.status(200).json({
      status: 200,
      message: "Higher Education data retrieved successfully",
      data: higherEducation,
    });
  } catch (error) {
    console.error("Error retrieving Higher Education data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Higher Education data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_highereducation_data = async (req, res) => {
  try {
    const { payload } = req.body;
    // Check if a HigherEducation record exists
    const existingHigherEducation = await db.HigherEducation.findOne();
    let higherEducation_data;
    if (existingHigherEducation) {
      // Update existing record
      await existingHigherEducation.update({ data: payload });
      higherEducation_data = existingHigherEducation;
    } else {
      // Create new record
      higherEducation_data = await db.HigherEducation.create({ data: payload });
    }
    return res.status(200).json({
      status: 200,
      message: "Higher Education data saved successfully",
      data: higherEducation_data,
    });
  } catch (error) {
    console.error("Error saving Higher Education data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Higher Education data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_highereducation_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.HigherEducation.destroy({
      where: { id },
    });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Higher Education not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Higher Education deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Higher Education data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Higher Education data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.get_all_preprimaryschool_data = async (req, res) => {
  try {
    const prePrimarySchool = await db.PrePrimarySchool.findAll();
    return res.status(200).json({
      status: 200,
      message: "Pre Primary School data retrieved successfully",
      data: prePrimarySchool,
    });
  } catch (error) {
    console.error("Error retrieving Pre Primary School data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to retrieve Pre Primary School data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.save_preprimaryschool_data = async (req, res) => {
  try {
    const { payload } = req.body;
    // Check if a PrePrimarySchool record exists
    const existingPrePrimarySchool = await db.PrePrimarySchool.findOne();
    let prePrimarySchool_data;
    if (existingPrePrimarySchool) {
      // Update existing record
      await existingPrePrimarySchool.update({ data: payload });
      prePrimarySchool_data = existingPrePrimarySchool;
    } else {
      // Create new record
      prePrimarySchool_data = await db.PrePrimarySchool.create({
        Data: payload,
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Pre Primary School data saved successfully",
      data: prePrimarySchool_data,
    });
  } catch (error) {
    console.error("Error saving Pre Primary School data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to save Pre Primary School data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
exports.delete_preprimaryschool_data = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedCount = await db.PrePrimarySchool.destroy({
      where: { id },
    });
    if (deletedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Pre Primary School not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Pre Primary School deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Pre Primary School data:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to delete Pre Primary School data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
