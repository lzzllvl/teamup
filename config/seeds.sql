USE teamup_db;

INSERT INTO `users` ( `name`,`email`, `password`, `phone`, `location`, `bio`) VALUES ("George Washington", "firstnOnly@president.gov", "woodenteeth", "1", "Me D.C.", "I am the first and best president the US has ever seen");

INSERT INTO `users` ( `name`,`email`, `password`, `phone`, `location`, `bio`) VALUES ("Kobe Bryant", "mamba@black.com", "eighttotwentyfour", "818-818-8181", "Los Angeles.", "Kobe System means success at success at success");

INSERT INTO `users` ( `name`,`email`, `password`, `phone`, `location`, `bio`) VALUES ("Richard Branson", "not@virgin.com", "stacksonstacks", "828230432", "Private Island", "I'm so rich my money's got money");

INSERT INTO `users` ( `name`,`email`, `password`, `phone`, `location`, `bio`) VALUES ("Bill Gates", "micro@soft.com", "stacksonstacks", "8472390293", "The Cloud", "Microsoft is a terrible name for a pornstar");

INSERT INTO `users` (`name`,`email`, `password`, `phone`, `location`, `bio`) VALUES ("Fred Flintstone", "prehistoric@cartoon.com", "password", "none", "Bedrock", "Barney Rubble doesn't have the sense god gave a pachyocephalosaurus");

INSERT INTO `entrepeneurs` (`UserId`) VALUES (1);

INSERT INTO `developers` (`UserId`, `skills`, `experience`) VALUES (3, "NodeJS ReactJS HTML5", "5+ Months");

INSERT INTO `developers` (`UserId`, `skills`, `experience`) VALUES (2, "PhotoShop, CSS, SASS", "100 years");

INSERT INTO `investors` (`UserId`, `investment_maximum`, `investment_minimum`) VALUES (4, 100000, 40000);

INSERT INTO `investors` (`UserId`, `investment_maximum`, `investment_minimum`) VALUES (5, 50, 25);

INSERT INTO `projects`(`project_name`, `full_description`, `short_description`, `needs_developer`, `needs_investor`, `offer_investor_text`, `offer_developer_text`, `offer_to_investor`, `project_scope`, `project_industry`, `EntrepeneurID`) VALUES("AirBnBugs", "Need to Rent Bugs with minimal government Regulation? Here at AirBnBugs, we got every type of bug imaginable! - Wasps, Centipedes, Tarantulas even some forms of aquatic insects. All for rent 24/7/365!", "Bugs for rent, from single ants to complex ecosystems", true, true, "Looking for an Investor with a passion for Bugs!", "Looking for a Developer who can write buggy code without bugs!", 15, "RoadMap to success, capitalize on the incredible demand for insects in the US market", "entymology", 1)
