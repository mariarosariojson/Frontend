using Microsoft.EntityFrameworkCore;

using System.ComponentModel.DataAnnotations;
using TypeScriptClientBuilder.Attributes;

namespace TBRapp.Model;

public class TBRappContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Kitchen> Kitchens { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderLine> OrderLines { get; set; }
    public DbSet<ProductCategory> ProductCategories { get; set; }
    // public DbSet<OrderStatus> OrderStatus { get; set; }
    // public DbSet<KitchenStatus> KitchenStatus { get; set; }
    // public DbSet<KitchenQueueTime> KitchenQueueTime { get; set; }

    public TBRappContext(DbContextOptions<TBRappContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
    }
}

public enum UserType
{
    Admin = 1,
    User
}
public enum OrderStatus
{
    Created = 1,
    Confirmed,
    Done
}

public enum KitchenStatus
{
    Closed = 1,
    Open
}

public class CreateProductCategory
{
    [MaxLength(100)]
    [Required]
    public string Name { get; set; }
    public ICollection<Product>? Products { get; set; } = new List<Product>();
}

public class ProductCategory : CreateProductCategory
{
    public int ProductCategoryId { get; set; }   
}

public class CreateProduct
{
    public int ProductCategoryId { get; set;}
    [MaxLength(100)]
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    [Precision(18, 2)]
    public decimal Price { get; set; }
    [Optional]
    public bool Active { get; set; } = true;
    [MaxLength(100)]
    [Optional]
    public string ImageUrl { get; set; } = string.Empty;
    public ICollection<OrderLine> OrderLines { get; set; } = new List<OrderLine>();
}

public class Product : CreateProduct
{
    public int ProductId { get; set; }
}

public class CreateUser
{
    [MaxLength(100)]
    [Required]
    public string FirstName { get; set; } = string.Empty;
    [MaxLength(100)]
    [Required]
    public string LastName { get; set; } = string.Empty;
    [MaxLength(100)]
    [Required]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; } = string.Empty;
    public UserType UserType { get; set; } = UserType.User;
    [Optional]
    public bool Active { get; set; } = true;
    public ICollection<Order> Orders { get; set; } = new List<Order>();
}

public class User : CreateUser
{
    public int UserId { get; set; }
}

public class CreateOrder
{
    public int UserId { get; set; }
    [Precision(18, 2)]
    public decimal TotalAmount { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Created;
    [Optional]
    public DateTime? Created { get; set; }
    [Optional]
    public DateTime? Updated { get; set; }
    [Optional]
    public DateTime? Confirmed { get; set; } = null;
    [Optional]
    public DateTime? Done { get; set; } = null;
    public ICollection<OrderLine>? OrderLines { get; set; } = new List<OrderLine>();
}

public class Order : CreateOrder
{
    public int OrderId { get; set; }
}

public class CreateOrderLine
{
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}

public class OrderLine : CreateOrderLine
{
    public int OrderLineId { get; set; }
}

public class CreateKitchen
{
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty;
    public int KitchenQueueTime { get; set; }
    public KitchenStatus KitchenStatus { get; set; } = KitchenStatus.Closed;
    [MaxLength(50)]
    public string Code { get; set; } = string.Empty;
}

public class Kitchen : CreateKitchen
{
    public int KitchenId { get; set; }
}

//public class OrderStatus
//{
//    public int OrderStatusId { get; set; }
//    [MaxLength(50)]
//    public string Name { get; set; } = string.Empty;
//}

//public class KitchenStatus
//{
//    public int KitchenStatusId { get; set; }

//    [MaxLength(50)]
//    public string Name { get; set; } = string.Empty;
//}

//public class KitchenQueueTime
//{
//    public int KitchenQueueTimeId { get; set; }
//    public int Time { get; set; }
//}
