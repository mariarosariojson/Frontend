
/*
N�gra testanv�ndare
*/
insert dbo.Users
values
('Anders', 'Andersson', 'anders@andersson.com', 1)
,('Bertil', 'Bertilsson', 'bertil@bertilsson.com', 1)
,('Cilla', 'Cillasson', 'cilla@cillasson.com', 1)
go
/*
Kirchens �r mest en h�llare f�r kod och k�tid. Koden anv�nds f�r att s�kerst�lla att anv�daren verkligen �r VIP.
Det finns �ven en status f�r att "�ppna/st�nga" k�ket som ex kan anv�ndas f�r att st�nga m�jligheten att l�gga best�llningar
*/
insert dbo.Kitchens
values ('Arninge boden', 0, 1, 'Korv3000')
go
/*
Produktkategorier f�r att klassa/gruppera det som �r till salu
*/
insert dbo.ProductCategories
values ('Korvmeny')
,('Hamburgermeny')
,('Tunbr�drulle')
,('Dricka')
,('Hamburgare')
go
/*
Det som �r till salu
*/
insert dbo.Products
values 
(3, 'TBR',100.00, 1, '')
,(1, 'TBR med dricka', 120.00, 1, '')
,(3, 'D�nerdr�pare', 120.00, 1, '')
,(4, 'Pucko', 20.00, 1, '')
,(2, 'Hamburgertallrik med dricka', 130.00, 1, '')
go
/*
N�gra ordrar
*/
insert dbo.Orders
values 
(1, 100.00, 1, GETDATE(),GETDATE(), null, null)
,(2, 290.00, 3, GETDATE(), GETDATE(), GETDATE(), GETDATE())
,(2, 290.00, 2, GETDATE(), GETDATE(), GETDATE(), null)
go

/*
Orderdetails h�ller reda p� vad varje order inneh�ller
*/
insert dbo.OrderLines
values 
(1, 1, 1)
,(2, 1, 2)
,(2, 2, 1)
,(3, 3, 1)
go