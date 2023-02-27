using TBRapp.Model;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TBRapp.Controllers;
[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly TBRappContext context;

    public OrderController(TBRappContext context)
    {
        this.context = context;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var Order = await context.Orders.Include(o => o.OrderLines).FirstOrDefaultAsync(o => o.OrderId == id);
        return Order != null ? Order : NotFound();
    }

    [HttpGet]
    public async Task<ActionResult<List<Order>>> ListOrders()
    {
        return await context.Orders.Include(o => o.OrderLines).ToListAsync();
    }

    [HttpGet("ListUsersOrders/{id}")]
    public async Task<ActionResult<List<Order>>> ListUsersOrders(int userId)
    {
        return await context.Orders.Include(o => o.OrderLines).Where(o => o.UserId == userId).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Order>> AddOrder([FromBody] CreateOrder Order)
    {
        var _Order = new Order
        {
            Created = DateTime.Now,
            OrderLines = Order.OrderLines,
            OrderStatus = Order.OrderStatus,
            TotalAmount = Order.TotalAmount,
            UserId = Order.UserId
        };

        context.Orders.Add(_Order);

        await context.SaveChangesAsync();

        return _Order;
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Order>> UpdateOrder(int id, [FromBody] CreateOrder Order)
    {
        var _Order = new Order
        {
            OrderId = id,
            Created = Order.Created,
            OrderLines = Order.OrderLines,
            OrderStatus = Order.OrderStatus,
            TotalAmount = Order.TotalAmount,
            UserId = Order.UserId,
            Updated = DateTime.Now,
            Confirmed = Order.OrderStatus == OrderStatus.Confirmed ? DateTime.Now : Order.Confirmed,
            Done = Order.OrderStatus == OrderStatus.Done ? DateTime.Now : Order.Done
        };

        context.Orders.Update(_Order);

        await context.SaveChangesAsync();

        return _Order;
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteOrder(int id)
    {
        await context.Orders.Include(o => o.OrderLines).FirstOrDefaultAsync(o => o.OrderId == id);
        return NoContent();
    }
}
