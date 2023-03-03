using TBRapp.Model;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Net;

namespace TBRapp.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly TBRappContext context;

    public ProductController(TBRappContext context)
    {
        this.context = context;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var Product = await context.Products.FindAsync(id);
        return Product != null ? Product : NotFound();
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> ListProducts()
    {
        return await context.Products.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Product>> AddProduct([FromBody] CreateProduct Product)
    {
        var _Product = new Product
        {
            OrderLines = Product.OrderLines,
            Active = Product.Active,
            ImageUrl = Product.ImageUrl,
            Name = Product.Name,
            Price = Product.Price
        };

        context.Products.Add(_Product);

        await context.SaveChangesAsync();

        return _Product;
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Product>> UpdateProduct(int id, [FromBody] CreateProduct Product)
    {
        var _Product = new Product
        {
            ProductId = id,
            OrderLines = Product.OrderLines,
            Active = Product.Active,
            ImageUrl = Product.ImageUrl,
            Name = Product.Name,
            Price = Product.Price
        };

        context.Products.Update(_Product);

        await context.SaveChangesAsync();

        return _Product;
    }
}
