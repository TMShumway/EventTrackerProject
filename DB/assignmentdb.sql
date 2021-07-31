-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema assignmentdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `assignmentdb` ;

-- -----------------------------------------------------
-- Schema assignmentdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `assignmentdb` DEFAULT CHARACTER SET utf8 ;
USE `assignmentdb` ;

-- -----------------------------------------------------
-- Table `assignment_class`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `assignment_class` ;

CREATE TABLE IF NOT EXISTS `assignment_class` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL DEFAULT 'CLASS NAME',
  `is_complete` TINYINT NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `course_code` VARCHAR(10) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `assignment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `assignment` ;

CREATE TABLE IF NOT EXISTS `assignment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL DEFAULT 'ASSIGNMENT NAME',
  `due_date` DATETIME NULL,
  `details` VARCHAR(500) NULL,
  `is_complete` TINYINT NULL,
  `assignment_class_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_assignment_assignment_class_idx` (`assignment_class_id` ASC),
  CONSTRAINT `fk_assignment_assignment_class`
    FOREIGN KEY (`assignment_class_id`)
    REFERENCES `assignment_class` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS assignmentuser;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'assignmentuser' IDENTIFIED BY 'assignmentuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'assignmentuser';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `assignment_class`
-- -----------------------------------------------------
START TRANSACTION;
USE `assignmentdb`;
INSERT INTO `assignment_class` (`id`, `name`, `is_complete`, `start_date`, `end_date`, `course_code`) VALUES (1, 'Discrete Mathematics', 0, '2021-07-06', '2021-07-30', 'MATH 2300');

COMMIT;


-- -----------------------------------------------------
-- Data for table `assignment`
-- -----------------------------------------------------
START TRANSACTION;
USE `assignmentdb`;
INSERT INTO `assignment` (`id`, `name`, `due_date`, `details`, `is_complete`, `assignment_class_id`) VALUES (1, 'Chapter 1 End-of-Chapter Exercises', '2021-07-08 23:59:59', 'Do problems 2-20; Evens only.', 0, 1);

COMMIT;

