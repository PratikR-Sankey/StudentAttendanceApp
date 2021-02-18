-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2021 at 01:47 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studentattendanceapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int(5) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `email` varchar(30) NOT NULL,
  `mobile` bigint(10) NOT NULL,
  `type` varchar(15) NOT NULL,
  `division` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `username`, `password`, `email`, `mobile`, `type`, `division`) VALUES
(57, 'pratik', '121', 'sanket111@gmail.com', 902389042, 'Student', 'IT'),
(58, 'pratik', '1', 'pratik111@gmail.com', 99830284093, 'Student', 'Sales'),
(59, 'pratik', '11', '1@gmail.com', 99830284093, 'Student', 'Sales'),
(69, 'pratik', '12', 'p1r1@gmail.com', 0, '', ''),
(74, 'pratik1', '12', 'pratik113@gmail.com', 94039394, 'Student', 'HR'),
(75, 'pratik1', '12', 'pratik113@gmail.com', 94039394, 'Student', 'HR'),
(76, 'pratik1', '12', 'pratik413@gmail.com', 9403940394, 'Student', 'HR'),
(78, 'pratik', '12', 'ppratik413@gmail.com', 9403940394, 'Student', 'HR'),
(79, 'PR', '1234', 'ppratik1413@gmail.com', 9403940394, 'Student', 'HR');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
