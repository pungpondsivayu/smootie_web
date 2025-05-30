-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2025 at 05:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smootieerp`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance_logs`
--

CREATE TABLE `attendance_logs` (
  `log_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `shift_id` int(11) DEFAULT NULL,
  `work_date` date DEFAULT NULL,
  `check_in_time` datetime DEFAULT NULL,
  `check_out_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `branch_id` int(11) NOT NULL,
  `branch_name` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `sub_district` varchar(100) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `address_detail` text DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `is_used` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`branch_id`, `branch_name`, `province`, `district`, `sub_district`, `postal_code`, `address_detail`, `created_date`, `updated_date`, `created_by`, `updated_by`, `is_used`) VALUES
(103, 'สมุทรปราการ สาขาที่ 1', 'สมุทรปราการ', 'เมืองสมุทรปราการ', 'ท้ายบ้าน', '71200', 'test', '2025-05-28 18:00:00', '2025-05-29 18:17:09', '53', '53', 1),
(105, 'กาญจนบุรี สาขาที่ 1', 'กาญจนบุรี', 'บ่อพลอย', 'หนองกุ่ม', '72000', '', '2025-05-29 18:18:08', NULL, '53', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `counter_stocks`
--

CREATE TABLE `counter_stocks` (
  `counter_stock_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `last_updated` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `coupon_id` int(11) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `discount_type` varchar(50) DEFAULT NULL,
  `discount_value` decimal(10,2) DEFAULT NULL,
  `minimum_purchase` decimal(10,2) DEFAULT NULL,
  `minimum_count` int(11) DEFAULT NULL,
  `expiry_date` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `is_used` tinyint(1) DEFAULT 1,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `is_used` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_coupons`
--

CREATE TABLE `customer_coupons` (
  `customer_id` int(11) NOT NULL,
  `coupon_id` int(11) NOT NULL,
  `is_used` tinyint(1) DEFAULT 0,
  `assigned_date` datetime DEFAULT current_timestamp(),
  `used_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_points`
--

CREATE TABLE `customer_points` (
  `customer_id` int(11) NOT NULL,
  `total_points` int(11) DEFAULT 0,
  `last_updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `hire_date` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `is_used` tinyint(1) DEFAULT 1,
  `image` text DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `branch_id`, `role_id`, `fullname`, `phone_number`, `password_hash`, `hire_date`, `status`, `created_date`, `updated_date`, `created_by`, `updated_by`, `is_used`, `image`, `email`) VALUES
(53, 103, 1, 'admin', 'admin@gmail.com', '9+5yisbSzD8VwJyOo/G1hw==', '2025-05-28 18:02:09', 'Active', '2025-05-28 18:02:31', '2025-05-28 18:58:57', '53', '53', 1, 'employee\\2_68.05.29_01.49(1).png', 'admin@gmail.com'),
(54, 103, 2, 'Manager1', '0987654321', 'CQJ6j04RYHJ3eNw7gVeHqmAsNeN7XugHqdVAz3srZXs=', '2025-05-29 00:00:00', 'Active', '2025-05-28 18:07:05', '2025-05-29 18:18:36', '53', '53', 1, 'NoImage.png', 'Manager1@gmail.com'),
(55, 105, 2, 'Manager2', '0192837465', 'ULUQ4hbgmMNIIt8OBODnh0bZy9UX2vZhMjQi4SWQ54A=', '2025-05-30 00:00:00', 'Active', '2025-05-29 18:19:10', NULL, '53', NULL, 1, 'NoImage.png', 'manager2@gmail.com'),
(57, 105, 3, 'starfkan', 'starfkan@gmail.com', 'GSorQpKgx93d67kUTW0KI3DWD0SvLOqYn+JiLLcg6Kw=', '2025-05-30 00:00:00', 'Active', '2025-05-29 18:28:10', '2025-05-29 18:37:26', '55', '55', 1, 'employee\\2_68.05.30_01.37(1).jpg', 'starfkan@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `employee_shifts`
--

CREATE TABLE `employee_shifts` (
  `esid` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `shift_id` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `is_used` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `ingredient_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `is_used` tinyint(1) DEFAULT 1,
  `Unit` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`ingredient_id`, `name`, `created_date`, `updated_date`, `created_by`, `updated_by`, `is_used`, `Unit`) VALUES
(11, 'นมสด', '2025-05-29 20:10:42', NULL, '53', NULL, 1, 'มิลลิลิตร (ml)'),
(12, 'น้ำสะอาด', '2025-05-29 20:10:55', NULL, '53', NULL, 1, 'ลิตร (L)'),
(13, 'ผงกาแฟ', '2025-05-29 20:11:05', NULL, '53', NULL, 1, 'กรัม (g)');

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `menu_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `is_used` tinyint(1) DEFAULT 1,
  `category_id` int(11) DEFAULT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`menu_id`, `name`, `price`, `created_by`, `updated_by`, `created_date`, `updated_date`, `is_used`, `category_id`, `image`) VALUES
(10, 'espressso', 50.00, '53', NULL, '2025-05-28 19:27:35', NULL, 1, 16, 'menu\\2_68.05.29_02.27(1).png'),
(11, 'oishi', 44.00, '53', NULL, '2025-05-28 19:27:57', NULL, 1, 17, 'menu\\2_68.05.29_02.27(2).png'),
(12, 'apple smootie', 75.00, '53', NULL, '2025-05-28 19:28:16', NULL, 1, 19, 'menu\\2_68.05.29_02.28(1).png'),
(13, 'orange smootie', 85.00, '53', NULL, '2025-05-28 19:28:43', NULL, 1, 19, 'menu\\2_68.05.29_02.28(2).png');

-- --------------------------------------------------------

--
-- Table structure for table `menu_categories`
--

CREATE TABLE `menu_categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `is_used` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_categories`
--

INSERT INTO `menu_categories` (`category_id`, `name`, `description`, `created_by`, `created_date`, `updated_by`, `updated_date`, `is_used`) VALUES
(16, 'กาแฟ', '', '53', '2025-05-28 19:11:21', NULL, NULL, 1),
(17, 'ชา', '', '53', '2025-05-28 19:11:27', NULL, NULL, 1),
(18, 'น้ำอดลม', '', '53', '2025-05-28 19:11:35', NULL, NULL, 1),
(19, 'น้ำหวาน', '', '53', '2025-05-28 19:11:41', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `menu_recipes`
--

CREATE TABLE `menu_recipes` (
  `recipe_id` int(11) NOT NULL,
  `menu_id` int(11) DEFAULT NULL,
  `ingredient_id` int(11) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `order_time` datetime DEFAULT NULL,
  `channel` varchar(50) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `pickup_method` varchar(50) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `discount_amount` decimal(10,2) DEFAULT 0.00,
  `final_amount` decimal(10,2) DEFAULT NULL,
  `coupon_id` int(11) DEFAULT NULL,
  `points_earned` int(11) DEFAULT 0,
  `points_used` int(11) DEFAULT 0,
  `status` varchar(50) DEFAULT NULL,
  `pickup_time` datetime DEFAULT NULL,
  `delivery_status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `customer_id`, `branch_id`, `order_time`, `channel`, `payment_method`, `pickup_method`, `total_amount`, `discount_amount`, `final_amount`, `coupon_id`, `points_earned`, `points_used`, `status`, `pickup_time`, `delivery_status`) VALUES
(64, NULL, 103, '2025-05-29 19:44:21', 'POS', 'cash', 'pickup', 1000.00, 0.00, 200.00, NULL, 0, 0, 'paid', NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `menu_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `order_id`, `menu_id`, `quantity`, `price`) VALUES
(22, 64, 13, 4, 100.00),
(23, 64, 12, 4, 100.00);

-- --------------------------------------------------------

--
-- Table structure for table `referrals`
--

CREATE TABLE `referrals` (
  `referral_id` int(11) NOT NULL,
  `referrer_id` int(11) DEFAULT NULL,
  `referred_id` int(11) DEFAULT NULL,
  `referred_date` datetime DEFAULT NULL,
  `reward_given` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `refreshtoken`
--

CREATE TABLE `refreshtoken` (
  `RFID` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `JwtTokenId` text NOT NULL,
  `Refresh_Token` text NOT NULL,
  `IsValid` tinyint(1) NOT NULL,
  `ExpiresAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `refreshtoken`
--

INSERT INTO `refreshtoken` (`RFID`, `UserId`, `JwtTokenId`, `Refresh_Token`, `IsValid`, `ExpiresAt`) VALUES
(108, 43, 'JTI91badd6c-1ce0-4a00-b882-1806301d72ce', '64865350-93c5-46ad-9632-58c167087d2e-9087cfb2-ffb9-40e2-a0d1-9946671920d1', 1, '2025-05-27 08:28:01'),
(109, 43, 'JTI64235e80-a87b-4b61-a7ce-fffdbc075195', '2cbc6b2d-8fea-4e2d-beb3-b7c3a1f6f5ab-cfbecfe2-a192-4037-aa20-6df98e43d50e', 1, '2025-05-27 08:29:31'),
(110, 43, 'JTI0e122e06-3f92-45fe-b85d-ab15ba1d27b0', '6f496f18-6500-40aa-a934-cc5b40527968-3015b969-a1cc-47c7-bd03-8e4a6da5acd1', 1, '2025-05-27 08:51:21'),
(111, 43, 'JTIb0b9a40e-20ac-4b6e-b31d-01815330c40e', '6f89f8c2-586d-4080-979a-bef9194268a6-d22220e5-9eb9-4993-afbe-5294bdb83f35', 1, '2025-05-27 17:13:27'),
(112, 43, 'JTIcd5a8131-4d72-4e9c-95c3-4ac2664e2c1f', 'c8422a9c-bc0c-414e-b8d7-67cd40a510a8-0fa5b039-293d-462b-922e-d97a90a7d8d2', 1, '2025-05-28 02:07:18'),
(113, 43, 'JTI1e5b60c1-99ab-4f56-84b1-7984809d3682', '4763ad43-28db-45a6-895a-4e53441d53d2-8459fe6e-2a2f-46e4-aa58-d5582913df7e', 1, '2025-05-28 02:12:22'),
(114, 43, 'JTIfebc34a2-5653-4515-a8ca-8d50c2cd43c4', 'c4329972-8565-43b8-948d-a16dae746d3f-8dd85e1a-3aba-472c-b387-aed01ba38e4b', 1, '2025-05-28 06:58:40'),
(115, 43, 'JTIe74885bf-a7fa-4449-86bc-285bce3e160a', 'c9a3906e-9460-48a9-8c9b-9b91c785b9d7-cebe35bd-ebe4-4dba-91a1-b334e64aaf2e', 1, '2025-05-28 07:09:09'),
(116, 43, 'JTI3a60000d-1054-4aee-bb77-870f6df352ee', 'aefde48a-70be-411f-9a43-83e67932552c-ab3834c1-3f43-4cc4-8145-48d6386db877', 1, '2025-05-28 07:09:20'),
(117, 43, 'JTIa8242bc4-fe98-48a1-9bfe-80d63316c288', '0bf68802-ef11-45b5-9bb3-13abedf05a54-57b43128-6a8b-4a3e-b682-010dcef5d600', 1, '2025-05-28 07:09:34'),
(118, 43, 'JTIf837470c-a06e-4888-9d2d-2da4839566a1', 'afc958de-88e8-458a-b4a5-1d67878e0973-0b19f248-5071-4a59-a2f8-2cb84771f747', 1, '2025-05-28 07:10:04'),
(119, 43, 'JTI7b6fa25d-61d5-4df4-a60e-eb10148f28c4', 'c6e7c610-b85e-439c-b690-1a22cf7a3307-19d66f68-0a60-45f4-812f-a818c3b2aa9e', 1, '2025-05-28 07:10:22'),
(120, 43, 'JTI086f4332-21e5-4568-8441-61d5eab9a59a', '65e98a02-cfc2-4cb0-8e18-b78585cabd46-194d179d-baa0-433e-ac38-8f3b3f46b368', 1, '2025-05-28 07:10:49'),
(121, 43, 'JTI8d19356f-c26a-42e3-8423-1db8fb733fa6', '3efd63fb-b9e3-43d4-aaaf-21addc28598b-9f58837e-b103-4e5a-b207-8b7993cb22f0', 1, '2025-05-28 07:11:37'),
(122, 43, 'JTI64716c43-4a0d-4822-abe6-9badf1531f53', '1a76015f-7275-4448-876f-c9a383efafbf-200c6d7a-73c7-4871-918a-4c44233c4ea7', 1, '2025-05-28 07:11:37'),
(123, 43, 'JTIdd11d357-9132-4f02-ba74-e6d689362e76', 'cca8801b-02d8-48db-923e-23f46c8a5ce9-4f27475c-c912-40ab-8e18-e3b07f98747f', 1, '2025-05-28 07:11:44'),
(124, 43, 'JTI0ea56bdb-fd61-4c93-9e58-d3da5ee72243', '43d3a07b-2fcf-45fa-8f8a-8917fcabac26-5c227112-4c5a-4ed2-ae4f-0dc32a01ab71', 1, '2025-05-28 07:11:44'),
(125, 43, 'JTI904db02a-a357-464f-912d-54a22f369546', '8fe22af4-1900-4228-a5cc-86f7c12f5d9f-a90fb149-6490-483b-9f96-08d8d5d60c19', 1, '2025-05-28 07:12:19'),
(126, 43, 'JTI091a6a5f-fc23-41a3-afe9-642ee383b12a', '6a145520-ac54-41e9-9b63-bfffb3d58b86-dad370c5-b736-4303-a574-9a445359640c', 1, '2025-05-28 07:12:36'),
(127, 43, 'JTI7ec126f9-6092-4291-bce3-2d0cf9af9e80', '9fe4a0a4-20f5-4bb6-b5a4-0bdac12f0734-6c96372c-2d24-4e5f-abed-c18142d9eacd', 1, '2025-05-28 07:12:36'),
(128, 43, 'JTI36b0b4a7-c02b-4c48-b724-e3d06beb28e9', '8827353c-fb5e-4c64-b20e-c128495d6fe0-9d6319bb-d131-4a12-a9a6-68fb46afe635', 1, '2025-05-28 07:13:08'),
(129, 43, 'JTI822c17f2-c656-4d3e-abcc-7c6323316f99', '7fafeac5-ffe3-4a41-ac11-fb6c05df01c9-bc5e7747-83c4-4bf6-9a0b-6c93fca0d49c', 1, '2025-05-28 07:15:33'),
(130, 43, 'JTIce4bfd74-3bc2-40bc-bdb1-cfd3ece25f09', '8844e7ec-3707-4806-8065-7746c1af0441-20c6203d-5e18-408f-962a-57f8fae01511', 1, '2025-05-28 07:15:56'),
(131, 43, 'JTI3584556b-0514-440e-ba66-9286dc00905b', 'bb4ef3dd-b8d8-46eb-b768-eaffc0dbf79d-a476f358-17c6-4906-9652-fc361f22d55f', 1, '2025-05-28 07:24:19'),
(132, 43, 'JTIdcf8033d-43d7-445a-8829-007950c71a16', '0e69065d-22fc-4224-9ecb-34110bcae9b8-16ca0503-4e8d-4f5c-a32d-f2de2b1021e0', 1, '2025-05-28 07:24:19'),
(133, 43, 'JTIf1b86e52-4e19-43ff-9490-7d2c6fedf290', 'ea099d77-4a53-43c2-b63f-5c3c823f1a9c-fe48d698-c396-416e-bee0-266c29885bfc', 1, '2025-05-28 08:11:52'),
(134, 43, 'JTIa252c99d-1c4e-4cf6-a8b8-6c09a87fb4c6', '1f59769c-c77f-4825-ac80-3bd8c7c0addb-3568d9f4-91a0-41a1-bb8e-9e41a04b92f6', 1, '2025-05-28 18:28:56'),
(135, 43, 'JTI890cf770-08db-49fc-90e1-91747960d5b9', 'a7c0a940-e999-44b4-aeef-d5470ac726e2-9908601a-b62a-4271-81cd-b093be093e5b', 1, '2025-05-28 20:26:57'),
(136, 43, 'JTIea2a7852-72d5-4ed1-a41c-192f586edf15', 'a233d9d8-369e-422a-85e4-6daf0b626e68-da617e4e-1b07-4d88-a58f-3b17e8909d05', 1, '2025-05-28 21:22:29'),
(137, 43, 'JTIafb673f5-d66b-427a-a02c-dbc6b460ecaa', '110e8aaa-79e0-4ea5-b7db-8bfa9f898c2a-3dca5931-5eaa-43be-b9c9-e41a7c386ae1', 1, '2025-05-28 21:22:39'),
(138, 43, 'JTI89d2aed8-d4df-443d-8bd9-107f9c23d2c7', 'dd5e45b8-8453-44e9-b09f-926716a2eb54-48196bb2-73f4-405e-b516-73871a42510b', 1, '2025-05-28 21:23:08'),
(139, 43, 'JTI9d40ad9f-1f86-469d-be54-80fe10030752', '1500707a-3ce5-421e-9efe-7852c8bb3e5e-fc118e14-f22c-44fb-b1e4-f3a2367e5bc7', 1, '2025-05-29 07:41:34'),
(140, 43, 'JTI5414b788-89e2-4be0-a236-aa2a1517aab4', '3dce6202-5fe4-4fa0-ba7d-9d982a673025-8f2e1ed8-54ff-4651-8729-5e9ac5b50e67', 1, '2025-05-29 09:21:20'),
(141, 43, 'JTIcab5e643-37a1-4b8d-a80b-70fa7b824511', '0a2a6ba9-bb24-41b1-a0df-000185466cbc-d1237b6a-8729-45d6-9694-e9d26cfd2b38', 1, '2025-05-29 16:43:22'),
(142, 43, 'JTI4bf7eb87-c9ea-4e6e-8575-b4ec59f7ebd5', 'c308ada0-fd69-49c9-91ce-7b218385377a-59dae5cc-24f0-4d52-a82f-157ae58aee28', 1, '2025-05-30 01:00:45'),
(143, 43, 'JTI26ef3d73-3ac8-46d6-8d6f-5125042c55bb', 'e855d053-ceae-4aae-899e-d0e93539ef9b-07630822-9cdc-46e6-bc22-bbc9514fad2d', 1, '2025-05-30 01:00:46'),
(144, 43, 'JTI5c11a262-da17-45ec-89a5-f56468608ac2', '55e4f531-6243-4347-95e9-0e767e6d1573-8bd315b4-787d-4a32-8dba-13fd10751a58', 1, '2025-05-30 07:30:35'),
(145, 43, 'JTI1d50b046-fc8a-41de-89b9-02e1dd669da8', 'b7114a81-dc80-4ba3-b4b6-19557543d997-c70c8563-b2b7-4975-bd69-463a0128cbb7', 1, '2025-05-30 07:30:35'),
(146, 43, 'JTIb97446c4-e173-45b8-9763-ca87de5ae679', '6fa7272c-43ca-47ec-abf8-28e06287ca08-5cc068d1-eb9c-47ba-ac53-f34b211b7b53', 1, '2025-05-30 07:30:36'),
(147, 43, 'JTI8dabdb99-ec6b-46b1-bbe5-bf103af4af45', '5cbafa66-aa45-4369-8156-25c9d59f8bec-cc458eb2-aa43-488f-8e8a-417370459eef', 1, '2025-05-30 11:08:13'),
(148, 53, 'JTI3f313d74-a333-4e28-932a-f86e0a21a078', '54e81286-83c4-4e14-965b-da5500129f4b-c23435f0-0926-4390-8729-d2b2c8b357fd', 1, '2025-05-30 18:03:38'),
(149, 53, 'JTI1a6d7fc5-f9b5-4c5b-8332-dd64d6646c10', 'b54790fe-f8ef-4dd8-a532-e11f84b984c7-8b7506b5-c9d1-4999-90ff-7a80de3f5054', 1, '2025-05-30 18:04:33'),
(150, 53, 'JTI8daa9f0b-5def-499e-befe-6d598ce011fb', 'a5c37297-1bce-4a94-af59-d12b526e1bb5-8563afc2-9319-4895-81a3-29979fe14096', 1, '2025-05-30 18:04:57'),
(151, 54, 'JTIbdbacca3-6a1a-422d-aba0-229c1304c390', 'cc985351-d8e7-473d-960a-9669963d3601-e0a2db43-0d48-4b0a-bc28-80066873ec53', 1, '2025-05-30 18:08:35'),
(152, 54, 'JTI399836af-9b6d-42f2-9a61-cc5c008d7cc9', '79184cb9-ddeb-4a7a-81a3-fd046afbc8e1-e281fea7-bdc9-48a0-998e-fb017eeb224f', 1, '2025-05-30 18:08:58'),
(153, 54, 'JTI5fceeb83-4ce7-4e00-88f9-6ff732a4876a', 'b734eebe-6c46-45dd-82fd-caa40cae1118-c6fabc03-13b5-4f1d-a983-fe9be0f1ebf0', 1, '2025-05-30 18:27:47'),
(154, 53, 'JTIc65c2406-cdd9-4bd2-9843-48ed1f27d43a', '5b675b2e-2761-4e78-a7a9-30848dec56c8-b4a7c272-1bab-490e-8543-93c1ab3481f0', 1, '2025-05-30 18:31:10'),
(155, 54, 'JTI0d7fc094-65ee-4c0d-b1be-5dd91df93d83', '84c7704f-fdd2-473b-a9a6-3b44daeeb145-e4f8a79a-fa40-4a9e-8b5f-2cbfd577dc9b', 1, '2025-05-30 18:32:19'),
(156, 54, 'JTI6ef5ff46-b191-4554-83fa-8a05839ef8b9', '1b8461de-54cc-4c51-946a-25faee88a70c-8c515f6a-ab8c-42e2-9f94-5226f941c940', 1, '2025-05-30 18:40:30'),
(157, 53, 'JTI4785eaaf-a4d8-4a38-9db7-8f7eab9b4d6a', '275150ba-2469-4924-8b7a-e38cd553d273-aab4b33f-9beb-490d-bedf-58a01c50b879', 1, '2025-05-30 18:49:25'),
(158, 54, 'JTI25d069d5-bfa8-4aa6-be50-2934b44157d2', 'fd0356af-aa28-4a7e-8927-5c5e8f0d40a8-68b827f7-f8bf-430d-8a44-b73c60b41bb0', 1, '2025-05-30 18:56:26'),
(159, 53, 'JTI040ffe7d-6aab-426c-af09-240e9a6907c9', 'cd48c191-0f5c-49de-8c12-579deee194c2-c6363d28-6bd0-43c8-99ea-a845b00cfa67', 1, '2025-05-30 18:56:49'),
(160, 53, 'JTI62ac79e4-86df-4dbb-855d-4f6b18f2ceb4', '990313b5-7990-4f34-bf32-f3a879996c19-08a308e0-a1ba-4585-92d2-ecc7449912b9', 1, '2025-05-30 18:56:53'),
(161, 54, 'JTI865336e2-efb3-41de-840d-45a69f4e6eb7', 'a127ba59-c190-4455-b6b7-921c5979b38d-78ec057c-fff9-4c5d-8b09-18c3e90c745f', 1, '2025-05-30 18:59:09'),
(162, 53, 'JTIc8f3ccba-aeff-4849-9098-47ba7aaf7fcd', '12d4baa5-260a-47c5-a595-ad1820a317a2-b62df0fb-1043-4e59-ae8b-6b14be56f283', 1, '2025-05-30 19:11:15'),
(163, 54, 'JTI18cd1e95-5e05-4324-8895-8ad6c260b100', '949cd20b-fb53-4069-bf9b-73bb8fa9739f-81166cc0-acdb-4104-8683-083d745a80cb', 1, '2025-05-30 19:11:48'),
(164, 53, 'JTI3e8671e0-3cd1-4eb5-aad7-6c446a8db501', 'ca134690-c206-4dc6-996b-da4329bd10dc-35d3c054-087b-4287-afa9-8dbaf951774e', 1, '2025-05-30 19:27:16'),
(165, 54, 'JTId40e73ef-fdbd-4dfc-b255-aec988459b2f', 'd1d23776-2b6e-4746-9d01-2ea70db6d955-ac6a4e01-8394-4ee7-970c-b30eafb8e118', 1, '2025-05-30 19:28:48'),
(166, 54, 'JTI87278de5-9f70-4778-909e-14ef71b059e8', 'a7f2cbf0-ee82-4ae8-9913-bb0ff8c4601e-8fe85eec-6b2d-4f15-ad43-78dfc7cdbaa2', 1, '2025-05-31 05:25:49'),
(167, 53, 'JTI8f4370ac-5044-4720-b271-14a8f2163669', 'aea3139f-f93d-44d5-829d-8e06d81eac1a-00149102-671e-4257-a401-e53c7c4d8e19', 1, '2025-05-31 17:25:51'),
(168, 54, 'JTIaf17d66d-4772-4045-a860-6266ad462b6e', '382cb91e-9647-4e69-abd6-097f557d7c18-852cba40-9f0c-481d-9dc2-3b7d9c854654', 1, '2025-05-31 17:26:05'),
(169, 53, 'JTI65b6c0e9-6ad7-45d6-9b59-8296717457be', 'fbe9a51d-30e8-4eca-a9e8-80d2591ea1d0-c0513b44-90d5-4eef-aa1e-2fa4e7085b59', 1, '2025-05-31 18:02:30'),
(170, 54, 'JTI5b6cfcbb-3785-46fd-814c-2d766668fdff', '7fdf437f-7cb5-4222-90d3-ee09a28137a6-661e0b3a-466b-4f08-b9eb-cc212b55d2c5', 1, '2025-05-31 18:02:45'),
(171, 53, 'JTIbb9776bc-8644-4a36-8a0f-f13e530cc6f4', '84b648f1-7119-40ea-bfbe-f4d57ea8cc2d-0e3ea094-71d0-42d4-8f8a-e1e6f194aba8', 1, '2025-05-31 18:04:25'),
(172, 53, 'JTIa58ce72f-80f6-48d5-9205-9f65229683d5', '34801fc8-9440-420d-8b54-8ed60c02e45d-b96cf919-e81e-4431-98af-1352d745672c', 1, '2025-05-31 18:05:26'),
(173, 53, 'JTIa699b829-f916-4ba6-ad2c-a936e611d1fc', '85efaacd-0144-4115-ae9f-09e511b72bc0-ebb9f4ed-57c8-4dae-b2d5-4de7fb0090de', 1, '2025-05-31 18:06:14'),
(174, 53, 'JTI9d5fd37e-e08d-4c1b-b9e1-b160997d0b91', 'd69315a5-07de-48f4-8a50-21f3f470c9e5-67dedd0e-ba7b-40d2-ad6b-469e54894334', 1, '2025-05-31 18:07:21'),
(175, 54, 'JTId0586f7d-273b-4ced-b745-a7544842e65a', '78adbae0-a594-40e8-85d6-195c1464cd56-c6c5a28f-4d8e-4ea7-9a9d-406d64cce322', 1, '2025-05-31 18:08:00'),
(176, 53, 'JTI220c3afe-971e-43ae-87bb-ae7f120f3739', '5d5b0e96-7ed5-4dc7-9643-be5196df7fe3-03508d93-5bc5-4e46-86c7-122ff6962786', 1, '2025-05-31 18:16:52'),
(177, 55, 'JTI26703f69-68bd-4cdc-8fe3-d158de3078cb', '7ecf02c9-59f6-4aad-92cc-5fd1e479bd76-3431cfe4-ecf1-4473-bea3-13aa67318543', 1, '2025-05-31 18:19:25'),
(178, 55, 'JTIefc7a3b0-db53-4140-8854-a98ca50dfefd', '9ca52be2-417b-4890-866d-cddbde4b64af-186949b8-3304-479d-bd24-f5a761827549', 1, '2025-05-31 18:25:58'),
(179, 53, 'JTId7dc4394-b36e-4c4d-8514-dfd3641f49e0', '2b0798ca-5952-4bb8-8156-6bd3ab0f823b-74769959-0c35-4960-b5dc-f49dd8607809', 1, '2025-05-31 18:29:58'),
(180, 55, 'JTI72a7f53d-a107-4f3c-8314-6d4e2b4a17b0', '5c21a905-b871-4126-b3fa-049efa2828a6-23326de8-0080-4a8b-9eeb-4302e66eaa3b', 1, '2025-05-31 18:30:17'),
(181, 57, 'JTIfa6137bd-b702-442e-83f9-a4510f1aaf51', '61784f69-7920-4d82-adc2-7c7c1be85ace-508f3c4c-b9ca-474a-8ef0-45a891099b41', 1, '2025-05-31 18:36:22'),
(182, 55, 'JTI838b7dc9-c9a3-4e63-9303-d14a5a3df25e', '987564d8-55d7-4e6a-b27d-4254f90320d5-3e9d31b6-40d3-4124-93c5-db33695f9656', 1, '2025-05-31 18:36:43'),
(183, 53, 'JTI2130697d-f309-4187-bc2f-d64213a2f1ff', '652ed674-9930-4821-bf21-ef8466066db0-9c5dc7ec-4404-43c3-b8bd-b560c8924174', 1, '2025-05-31 20:10:32'),
(184, 53, 'JTIbb751258-fea5-401a-adfc-a97c1fc501ab', '31099813-72b5-4239-b777-551410cb172a-01f66958-0031-44bb-97c3-070207482a3a', 1, '2025-06-01 03:46:49');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `is_used` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `created_date`, `updated_date`, `created_by`, `updated_by`, `is_used`) VALUES
(1, 'Admin', '2025-05-16 15:13:51', NULL, 'string', NULL, 1),
(2, 'Manager', '2025-05-26 20:36:21', NULL, '43', NULL, 1),
(3, 'Starf', '2025-05-26 20:36:25', NULL, '43', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `shifts`
--

CREATE TABLE `shifts` (
  `shift_id` int(11) NOT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `shift_name` varchar(50) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `is_used` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_items`
--

CREATE TABLE `stock_items` (
  `stock_id` int(11) NOT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `ingredient_id` int(11) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stock_requests`
--

CREATE TABLE `stock_requests` (
  `request_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `request_date` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `approved_by` varchar(50) DEFAULT NULL,
  `approved_date` datetime DEFAULT NULL,
  `request_type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_requests`
--

INSERT INTO `stock_requests` (`request_id`, `employee_id`, `branch_id`, `request_date`, `status`, `approved_by`, `approved_date`, `request_type`) VALUES
(8, 55, 105, '2025-05-29 20:36:43', 'approved', '', NULL, 'Add'),
(9, 55, 105, '2025-05-29 21:06:06', 'approved', '', NULL, 'Add');

-- --------------------------------------------------------

--
-- Table structure for table `stock_request_items`
--

CREATE TABLE `stock_request_items` (
  `item_id` int(11) NOT NULL,
  `request_id` int(11) DEFAULT NULL,
  `ingredient_id` int(11) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_request_items`
--

INSERT INTO `stock_request_items` (`item_id`, `request_id`, `ingredient_id`, `quantity`) VALUES
(1, 8, 13, 50.00),
(2, 8, 12, 20.00),
(3, 9, 13, 50.00),
(4, 9, 12, 20.00),
(5, 9, 11, 20.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance_logs`
--
ALTER TABLE `attendance_logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `shift_id` (`shift_id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`branch_id`);

--
-- Indexes for table `counter_stocks`
--
ALTER TABLE `counter_stocks`
  ADD PRIMARY KEY (`counter_stock_id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`coupon_id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `customer_coupons`
--
ALTER TABLE `customer_coupons`
  ADD PRIMARY KEY (`customer_id`,`coupon_id`),
  ADD KEY `coupon_id` (`coupon_id`);

--
-- Indexes for table `customer_points`
--
ALTER TABLE `customer_points`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `employee_shifts`
--
ALTER TABLE `employee_shifts`
  ADD PRIMARY KEY (`esid`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `shift_id` (`shift_id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`ingredient_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`menu_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `menu_categories`
--
ALTER TABLE `menu_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `menu_recipes`
--
ALTER TABLE `menu_recipes`
  ADD PRIMARY KEY (`recipe_id`),
  ADD KEY `menu_id` (`menu_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `coupon_id` (`coupon_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `menu_id` (`menu_id`);

--
-- Indexes for table `referrals`
--
ALTER TABLE `referrals`
  ADD PRIMARY KEY (`referral_id`),
  ADD KEY `referrer_id` (`referrer_id`),
  ADD KEY `referred_id` (`referred_id`);

--
-- Indexes for table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD PRIMARY KEY (`RFID`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `shifts`
--
ALTER TABLE `shifts`
  ADD PRIMARY KEY (`shift_id`),
  ADD KEY `branch_id` (`branch_id`);

--
-- Indexes for table `stock_items`
--
ALTER TABLE `stock_items`
  ADD PRIMARY KEY (`stock_id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- Indexes for table `stock_requests`
--
ALTER TABLE `stock_requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `branch_id` (`branch_id`);

--
-- Indexes for table `stock_request_items`
--
ALTER TABLE `stock_request_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `request_id` (`request_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance_logs`
--
ALTER TABLE `attendance_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `branch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `counter_stocks`
--
ALTER TABLE `counter_stocks`
  MODIFY `counter_stock_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `coupon_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `employee_shifts`
--
ALTER TABLE `employee_shifts`
  MODIFY `esid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `menu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `menu_categories`
--
ALTER TABLE `menu_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `menu_recipes`
--
ALTER TABLE `menu_recipes`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `referrals`
--
ALTER TABLE `referrals`
  MODIFY `referral_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  MODIFY `RFID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shifts`
--
ALTER TABLE `shifts`
  MODIFY `shift_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stock_items`
--
ALTER TABLE `stock_items`
  MODIFY `stock_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `stock_requests`
--
ALTER TABLE `stock_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `stock_request_items`
--
ALTER TABLE `stock_request_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance_logs`
--
ALTER TABLE `attendance_logs`
  ADD CONSTRAINT `attendance_logs_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `attendance_logs_ibfk_2` FOREIGN KEY (`shift_id`) REFERENCES `shifts` (`shift_id`);

--
-- Constraints for table `counter_stocks`
--
ALTER TABLE `counter_stocks`
  ADD CONSTRAINT `counter_stocks_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`),
  ADD CONSTRAINT `counter_stocks_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`);

--
-- Constraints for table `customer_coupons`
--
ALTER TABLE `customer_coupons`
  ADD CONSTRAINT `customer_coupons_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  ADD CONSTRAINT `customer_coupons_ibfk_2` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`coupon_id`);

--
-- Constraints for table `customer_points`
--
ALTER TABLE `customer_points`
  ADD CONSTRAINT `customer_points_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`),
  ADD CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

--
-- Constraints for table `employee_shifts`
--
ALTER TABLE `employee_shifts`
  ADD CONSTRAINT `employee_shifts_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `employee_shifts_ibfk_2` FOREIGN KEY (`shift_id`) REFERENCES `shifts` (`shift_id`);

--
-- Constraints for table `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `menu_categories` (`category_id`);

--
-- Constraints for table `menu_recipes`
--
ALTER TABLE `menu_recipes`
  ADD CONSTRAINT `menu_recipes_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`menu_id`),
  ADD CONSTRAINT `menu_recipes_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`),
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`coupon_id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`menu_id`);

--
-- Constraints for table `referrals`
--
ALTER TABLE `referrals`
  ADD CONSTRAINT `referrals_ibfk_1` FOREIGN KEY (`referrer_id`) REFERENCES `customers` (`customer_id`),
  ADD CONSTRAINT `referrals_ibfk_2` FOREIGN KEY (`referred_id`) REFERENCES `customers` (`customer_id`);

--
-- Constraints for table `shifts`
--
ALTER TABLE `shifts`
  ADD CONSTRAINT `shifts_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`);

--
-- Constraints for table `stock_items`
--
ALTER TABLE `stock_items`
  ADD CONSTRAINT `stock_items_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`),
  ADD CONSTRAINT `stock_items_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`);

--
-- Constraints for table `stock_requests`
--
ALTER TABLE `stock_requests`
  ADD CONSTRAINT `stock_requests_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `stock_requests_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`);

--
-- Constraints for table `stock_request_items`
--
ALTER TABLE `stock_request_items`
  ADD CONSTRAINT `stock_request_items_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `stock_requests` (`request_id`),
  ADD CONSTRAINT `stock_request_items_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
