-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : sam. 15 mars 2025 à 17:27
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `real_estate_sale`
--

-- --------------------------------------------------------

--
-- Structure de la table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `contact_us`
--

INSERT INTO `contact_us` (`id`, `name`, `email`, `phone`, `subject`, `message`, `created_at`) VALUES
(1, 'John Doe', 'john.doe@example.com', '1234567890', 'Inquiry', 'Hello, I have a question about your services.', '2025-03-13 20:24:44'),
(2, 'ABDESSAMAD EL MAAROUFI', 'elmaarpro@gmail.com', '0700161503', 'afasfasdf', 'asdfasdf', '2025-03-13 20:30:55');

-- --------------------------------------------------------

--
-- Structure de la table `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `location` varchar(255) NOT NULL,
  `size` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `category` enum('villa','apartment','house','other') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `properties`
--

INSERT INTO `properties` (`id`, `title`, `description`, `price`, `location`, `size`, `created_at`, `user_id`, `picture`, `category`) VALUES
(22, 'Villa de luxe avec piscine', 'Villa spacieuse avec 5 chambres, piscine privée et vue sur la mer.', 99999999.99, 'Nice, France', 400, '2025-03-11 20:33:00', 3, '1741898166461.jpg', 'villa'),
(23, 'Belle maison moderne', 'Une magnifique maison moderne avec 4 chambres, 3 salles de bain et un grand jardin.', 99999998.99, 'Paris, France', 200, '2025-03-11 20:33:10', 3, '1741898141129.jpg', 'house'),
(30, 'appart2', 'mon appart', 10000000.00, 'SDSDSDSD', 2344, '2025-03-12 21:49:52', 4, '1741817657709.jpg', 'apartment'),
(31, 'house 1', 'house 1house 1house 1house 1house 1', 122121.00, 'kenitra', 22222, '2025-03-12 22:08:45', 4, '1741817325191.jpg', 'house'),
(32, 'house 11', 'zzzzzzzzzzz', 122121.00, 'kenitra', 22222, '2025-03-12 22:09:30', 4, '1741817370796.jpg', 'house'),
(33, 'appartement kenitra', 'ssssssss', 122121.00, 'kenitra', 22222, '2025-03-12 22:11:52', 4, '1741817512517.jpg', 'apartment'),
(34, 'villa houzia', 'villa houzia', 122121.00, 'kenitra', 22222, '2025-03-12 22:12:59', 4, '1741817579920.jpg', 'villa'),
(35, 'villa mehdia', 'ssssssssssssdddddddddddddd', 122121.00, 'kenitra', 22222, '2025-03-12 22:13:27', 4, '1741817607987.jpg', 'villa'),
(36, 'villa mehdia2', 'ssssssssssssssssss', 122121.00, 'kenitra', 22222, '2025-03-12 22:13:45', 4, '1741817625418.jpg', 'villa'),
(37, 'villaaaa', 'llllllllllllllllll', 300000.00, 'maroc', 666666, '2025-03-13 18:25:19', 3, '1741890318906.jpg', 'villa'),
(38, 'apart mimoza', 'This setup ensures that your frontend and backend are properly connected for handling contact form', 2000000.00, 'maroc', 1000, '2025-03-13 20:50:01', 3, '1741899001454.jpg', 'apartment');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `gender` enum('male','female') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `address`, `gender`) VALUES
(2, 'Boubkeur', 'boubkeuryassine2@gmail.com', '$2b$10$24hrJ70XaIGh3uard5u88up4h/tWt1W9UX7gpCZwTed/3/53jFp.i', '06103550897', 'djlkdjlfkdjfldklffjlkjf', 'male'),
(3, 'ABDESSAMAD EL MAAROUFI', 'elmaarpro@gmail.com', '$2b$10$M/vbg86xaOboVSUm30/bv.ZkwEEQd0TTJEKWDzDHdKleJWQqEBJ42', '0700161503', '236 quartier chaabi, atlas2', 'male'),
(4, 'zidax', 'zmaaroufi123@gmail.com', '$2b$10$jiyeU4WzYlY/qpIvd5fTguTLC24ZDmmrCf4nLah/Xu5aZLGs7sTx.', '0700161503', 'deddde', 'male');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
