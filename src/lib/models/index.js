const Sequelize = require('sequelize');
const sequelize = require('../db');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Only load models if sequelize is available
if (sequelize) {
    // Models
    db.Home = require('./Home.model')(sequelize, Sequelize.DataTypes);
    db.History = require('./History.model')(sequelize, Sequelize.DataTypes);
    db.VisionMission = require('./VisionMission.model')(sequelize, Sequelize.DataTypes);
    db.PrincipalMessage = require('./PrincipalMessage.model')(sequelize, Sequelize.DataTypes);
    db.Infrastructure = require('./Infrastructure.model')(sequelize, Sequelize.DataTypes);
    db.Curriculum = require('./Curriculum.model')(sequelize, Sequelize.DataTypes);
    db.PrePrimarySchool = require('./PrePrimarySchool.model')(sequelize, Sequelize.DataTypes);
    db.PrimarySchool = require('./PrimarySchool.model')(sequelize, Sequelize.DataTypes);
    db.MiddleSchool = require('./MiddleSchool.model')(sequelize, Sequelize.DataTypes);
    db.SeniorSchool = require('./SeniorSchool.model')(sequelize, Sequelize.DataTypes);
    db.AdmissionProcess = require('./AdmissionProcess.model')(sequelize, Sequelize.DataTypes);
    db.ApplicationForm = require('./ApplicationForm.model')(sequelize, Sequelize.DataTypes);
    db.Fees = require('./Fees.model')(sequelize, Sequelize.DataTypes);
    db.Sports = require('./Sports.model')(sequelize, Sequelize.DataTypes);
    db.Arts = require('./Arts.model')(sequelize, Sequelize.DataTypes);
    db.Music = require('./Music.model')(sequelize, Sequelize.DataTypes);
    db.Clubs = require('./Clubs.model')(sequelize, Sequelize.DataTypes);
    db.Competitions = require('./Competitions.model')(sequelize, Sequelize.DataTypes);
    db.Events = require('./Events.model')(sequelize, Sequelize.DataTypes);
    db.SchoolTimings = require('./SchoolTimings.model')(sequelize, Sequelize.DataTypes);
    db.SchoolCalendar = require('./SchoolCalendar.model')(sequelize, Sequelize.DataTypes);
    db.Transport = require('./Transport.model')(sequelize, Sequelize.DataTypes);
    db.Canteen = require('./Canteen.model')(sequelize, Sequelize.DataTypes);
    db.HouseSystem = require('./HouseSystem.model')(sequelize, Sequelize.DataTypes);
    db.StudentCouncil = require('./StudentCouncil.model')(sequelize, Sequelize.DataTypes);
    db.Gallery = require('./Gallery.model')(sequelize, Sequelize.DataTypes);
    db.Forms = require('./Forms.model')(sequelize, Sequelize.DataTypes);
    db.Syllabus = require('./Syllabus.model')(sequelize, Sequelize.DataTypes);
    db.FeeStructure = require('./FeeStructure.model')(sequelize, Sequelize.DataTypes);
    db.Policies = require('./Policies.model')(sequelize, Sequelize.DataTypes);
    db.ContactUs = require('./ContactUs.model')(sequelize, Sequelize.DataTypes);
    db.Navbar = require('./Navbar.model')(sequelize, Sequelize.DataTypes);
    db.Notice = require('./Notice.model')(sequelize, Sequelize.DataTypes);
    db.Alumni = require('./Alumni.model')(sequelize, Sequelize.DataTypes);
    db.Career = require('./Career.model')(sequelize, Sequelize.DataTypes);
    db.Achievements = require('./Achievements.model')(sequelize, Sequelize.DataTypes);
    db.User = require('./User.model')(sequelize, Sequelize.DataTypes);
    db.Virtual_Tour = require('./Virtual_Tour.model')(sequelize, Sequelize.DataTypes);
    db.HigherEducation = require('./HigherEducation.model')(sequelize, Sequelize.DataTypes);
}

module.exports = db;
