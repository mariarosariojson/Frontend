
  update [TBRapp].[dbo].[Users]
  set UserType = 2
  go

  insert [TBRapp].[dbo].[Users]
  values ('Admin', 'Adminsson', 'admin@adminsson.com', 1, 1)
  go