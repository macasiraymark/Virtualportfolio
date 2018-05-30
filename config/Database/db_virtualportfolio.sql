-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2018 at 04:40 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_virtualportfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_accounts`
--

CREATE TABLE `tbl_accounts` (
  `userid` varchar(20) NOT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `middlename` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `contactnumber` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `municipality` varchar(100) DEFAULT NULL,
  `sector` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `acct_type` varchar(100) DEFAULT NULL,
  `active` varchar(100) DEFAULT NULL,
  `attempts` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_accounts`
--

INSERT INTO `tbl_accounts` (`userid`, `firstname`, `middlename`, `lastname`, `contactnumber`, `address`, `municipality`, `sector`, `email`, `password`, `acct_type`, `active`, `attempts`) VALUES
('U2RZqecYIe', 'Jeff', 'Tango', 'Factora', '0927364784', '#25 Apple St.', 'Tuguegarao City', NULL, 'jeff_factora@gmail.com', '$2y$10$Bp5G2YCMqXv4RnLuOGo4b.zsDuoGhuDUa9AZBEwsFlcejzrWWNNka', '0', '1', '0'),
('8g2ITTKIgG', 'Patrick', 'Baldurya', 'Bernardino', '0915625372', '33A Taft', 'Ballesteros', NULL, 'patrick@gmail.com', '$2y$10$c1Ap1yLc8f6Z7aXaOLDohe3rmj/xGJYjKmt1S1Wl8FFNt8m8DUIO.', '0', '1', '0');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_agriculturist`
--

CREATE TABLE `tbl_agriculturist` (
  `refid` varchar(100) NOT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `middlename` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `municipality` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `active` varchar(100) DEFAULT NULL,
  `categoryid` varchar(10) DEFAULT NULL,
  `subcategoryid` varchar(10) DEFAULT NULL,
  `datecreated` datetime(6) DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_agriculturist`
--

INSERT INTO `tbl_agriculturist` (`refid`, `firstname`, `middlename`, `lastname`, `contact`, `address`, `municipality`, `province`, `active`, `categoryid`, `subcategoryid`, `datecreated`, `createdby`) VALUES
('z69168Dcx7', 'Sydney', 'acosta', 'tagguegg', '09752432159', '#23 valenzuela st.', 'baggao', 'cagayan', '1', 'l9HIF0VCDf', 'ih4coWTPDR', NULL, NULL),
('SpvcSoEd6h', 'Mark', 'Tungcul', 'Macasiray', '0927364723', 'Poblacion', 'Iguig', 'Cagayan Valley', '1', 'l9HIF0VCDf', 'ih4coWTPDR', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
  `refid` varchar(10) NOT NULL,
  `title` varchar(250) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `datecreated` varchar(50) DEFAULT NULL,
  `createdby` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`refid`, `title`, `description`, `datecreated`, `createdby`) VALUES
('BF2LCWLOvZ', 'Root Crops', 'Root Crops only', '01/27/2018 08:13:10', ''),
('7u480P.Hoh', 'Grains', 'Grains only', '01/27/2018 08:12:25', ''),
('l9HIF0VCDf', 'Vegetables', 'Planting for vegetables', '01/27/2018 06:32:50', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_downloads`
--

CREATE TABLE `tbl_downloads` (
  `refid` int(100) NOT NULL,
  `userid` int(100) NOT NULL,
  `portfolioid` int(100) NOT NULL,
  `datedownloaded` date NOT NULL,
  `assistedby` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_farmlocations`
--

CREATE TABLE `tbl_farmlocations` (
  `refid` varchar(100) NOT NULL,
  `agriculturistid` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `longitude` varchar(100) NOT NULL,
  `latitude` varchar(100) NOT NULL,
  `active` varchar(100) NOT NULL,
  `farmtype` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_farmlocations`
--

INSERT INTO `tbl_farmlocations` (`refid`, `agriculturistid`, `address`, `longitude`, `latitude`, `active`, `farmtype`) VALUES
('tiCz7Wiwj.', 'SpvcSoEd6h', 'Poblacion', '97402834710234.33', '083497234897402.1', '1', 'Vegetables'),
('Ywgfnfl9bv', 'z69168Dcx7', '#Poblacion Baggao', '121.94731100000001', '17.9142351', '1', 'Vegetables');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_portfolios`
--

CREATE TABLE `tbl_portfolios` (
  `refid` varchar(100) NOT NULL,
  `agriculturistid` varchar(100) NOT NULL,
  `filename` varchar(100) NOT NULL,
  `dateposted` varchar(30) NOT NULL,
  `postedby` varchar(100) NOT NULL,
  `categoryid` varchar(150) DEFAULT NULL,
  `subcategoryid` varchar(150) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_portfolios`
--

INSERT INTO `tbl_portfolios` (`refid`, `agriculturistid`, `filename`, `dateposted`, `postedby`, `categoryid`, `subcategoryid`) VALUES
('B4uI/w/ALr', 'SpvcSoEd6h', 'Lankbank Environmental.pdf', '/03/25/2018', '', 'BF2LCWLOvZ', '7yzk2RWwr/');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sectorassignment`
--

CREATE TABLE `tbl_sectorassignment` (
  `refid` int(100) NOT NULL,
  `userid` int(100) NOT NULL,
  `sector` varchar(100) NOT NULL,
  `dateassigned` date NOT NULL,
  `assignedby` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subcategory`
--

CREATE TABLE `tbl_subcategory` (
  `refid` varchar(10) NOT NULL,
  `categoryid` varchar(10) DEFAULT NULL,
  `title` varchar(250) DEFAULT NULL,
  `description` text,
  `datecreated` varchar(50) DEFAULT NULL,
  `createdby` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_subcategory`
--

INSERT INTO `tbl_subcategory` (`refid`, `categoryid`, `title`, `description`, `datecreated`, `createdby`) VALUES
('pQtB27xnDU', '7u480P.Hoh', 'Corn', 'Grains only', '01/27/2018 08:12:50', ''),
('7yzk2RWwr/', 'BF2LCWLOvZ', 'Kamote', 'for root crops only', '01/27/2018 08:13:26', ''),
('ih4coWTPDR', 'l9HIF0VCDf', 'Cabbage', 'Green Leafy', '01/23/2018 14:48:44', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `tbl_agriculturist`
--
ALTER TABLE `tbl_agriculturist`
  ADD PRIMARY KEY (`refid`);

--
-- Indexes for table `tbl_category`
--
ALTER TABLE `tbl_category`
  ADD PRIMARY KEY (`refid`);

--
-- Indexes for table `tbl_downloads`
--
ALTER TABLE `tbl_downloads`
  ADD PRIMARY KEY (`refid`);

--
-- Indexes for table `tbl_farmlocations`
--
ALTER TABLE `tbl_farmlocations`
  ADD PRIMARY KEY (`refid`);

--
-- Indexes for table `tbl_portfolios`
--
ALTER TABLE `tbl_portfolios`
  ADD PRIMARY KEY (`refid`);

--
-- Indexes for table `tbl_sectorassignment`
--
ALTER TABLE `tbl_sectorassignment`
  ADD PRIMARY KEY (`refid`);

--
-- Indexes for table `tbl_subcategory`
--
ALTER TABLE `tbl_subcategory`
  ADD PRIMARY KEY (`refid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
