-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2023 at 04:17 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jwt_auth`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'babal', '$2a$12$7Uo38XMuiAC7I.9RxLsAIeENhUGFq3EBsQ5vcV4fFFwfWRnltEHnq', NULL, '2023-11-14 13:33:27', '2023-11-18 03:13:37'),
(2, 'wakwaw', '$2b$10$0IND0.8zy//Wqw7P8lVzR.C6GC1pbZLXbHo.XrVEtBmSDxVfedMwS', 'siajg', '2023-11-14 13:14:52', '2023-11-14 13:14:52'),
(3, 'ehehe', '$2b$10$mn8TKc6V1HMPsE6O4INqs.AjROv1uPLHsLvOjZflinprPaRGNGok2', 'goblog', '2023-11-14 13:15:22', '2023-11-14 13:15:22'),
(4, 'kaopat', '$2b$10$H5u3YD7cNXF4Qz7I6fTLkuMYE8dAM0GrXB5N/rorPtJp4TJVFRQ0i', 'gokaopatblog', '2023-11-14 13:53:55', '2023-11-14 13:53:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
