-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 29, 2018 at 11:28 AM
-- Server version: 5.7.22
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `craft_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2018_05_23_093035_add_phone_field_to_users_table', 2),
(4, '2018_05_23_093959_add_phone_field_to_users_table', 3),
(5, '2018_05_23_103820_add_company_field_to_users_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('rooprai.aman@gmail.com', '$2y$10$BHVLb7R73My23pXhvz65VeLuqEvHj2WdZeJiZY6qttrU.tkAzMwxK', '2018-05-23 04:48:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`, `phone`, `company_name`) VALUES
(1, 'aman', 'rooprai.aman@gmail.com', '$2y$10$5Wj/cPlhMNAKypGH2ibkPO92oxR3VQBBJWKfXaHZK9VloKoDivIHm', '2nQD0lDxDzMcyc4tlXesaZawmjiwCSlaMSsNqPZrTPyWs2bjZLUj1sms14Z9', '2018-05-23 03:37:44', '2018-05-23 03:37:44', '', ''),
(2, 'aman', 'aman@gmail.com', '$2y$10$qk/1XYlFP5AF2ZoDPxGcqO1H/u46JlvL0qX3sGIWVLM7Y6UOxFahC', 'un4NapcU9SShRvJwEZ7tsGChsgEBjD2bMQQE0tzU3WuhDywd6xY7SyPpEVOx', '2018-05-23 03:40:41', '2018-05-23 03:40:41', '', ''),
(3, 'Test', 'test@mail.com', '$2y$10$.hvzFUA2nDoWHYTS4F3cYeH4y3Kve5Q5jSPl3KL0gzcd0URmW4wZ.', '6szLGbVgzwC0uAFl5OSGsv0554cOI8w0F2Dj76WtJJ9eeNO39WBgvvCe2R4o', '2018-05-23 04:02:32', '2018-05-23 04:02:32', '', ''),
(4, 'Test User', 'test1@mail.com', '$2y$10$JYLbDQ9/eGucJ.9lvq3OQ.MynRzMSNz./GWPUCFIOcha7dWDtqerG', 'FcPjzT39QV9wCyaLGmulVq8BygZ3TQlfR7N8DMyg0dmIa6KTnr3FB1DTMNqz', '2018-05-23 04:06:15', '2018-05-23 04:06:15', '', ''),
(5, 'Aman Dhiman', 'test2@mail.com', '$2y$10$tkU.09c2LByzN99LMo3UG.itiefdcP4MZBARRkoNGEcvo6JKBksKG', 'dKGFxex3TBKxlEQXZDQW31rrQjcoQbXq8ODi5RIlexFHWeMcZW6gibq0gOLy', '2018-05-23 04:23:50', '2018-05-23 04:23:50', '734537645765', ''),
(6, 'Aman Dhiman', 'amand@mail.com', '$2y$10$rtBEcMdqODv5a9CNWayhN.2cwyNsa7L.psYahXuPQLggKc6TJpVuO', 'IfgELe4SunWdNwhXjPKFRfeV0BztGzzS2NSg1eTuaQZHPCmxiWQY70D0isxX', '2018-05-23 04:46:11', '2018-05-23 04:46:11', '634576435743', ''),
(7, 'Aman Dhiman', 'dhiman@gmail.com', '$2y$10$rc3S4PWj1MEzDgGZyW5EVOA/NnVK08HlQTMAY2bI1dWBPrjLnvqRK', 'FNDK6ld1iiQlLRgz9YctsPVxRt8y7O9V6rGVUago72bkDmTbzKxIpGeE7qpN', '2018-05-23 05:11:59', '2018-05-23 05:11:59', '435345345435', 'Zest geek');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
