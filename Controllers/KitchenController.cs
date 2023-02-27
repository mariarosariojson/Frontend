using TBRapp.Model;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Net;

namespace TBRapp.Controllers;
[Route("api/[controller]")]
[ApiController]
public class KitchenController : ControllerBase
{
    private readonly TBRappContext context;

    public KitchenController(TBRappContext context)
    {
        this.context = context;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Kitchen>> GetKitchen(int id)
    {
        var Kitchen = await context.Kitchens.FindAsync(id);
        return Kitchen != null ? Kitchen : NotFound();
    }

    [HttpGet]
    public async Task<ActionResult<List<Kitchen>>> ListKitchens()
    {
        return await context.Kitchens.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Kitchen>> AddKitchen([FromBody] CreateKitchen Kitchen)
    {
        var _Kitchen = new Kitchen
        {
            Code = Kitchen.Code,
            Name = Kitchen.Name,
            KitchenQueueTime = Kitchen.KitchenQueueTime,
            KitchenStatus = Kitchen.KitchenStatus
        };

        context.Kitchens.Add(_Kitchen);

        await context.SaveChangesAsync();

        return _Kitchen;
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Kitchen>> UpdateKitchen(int id, [FromBody] CreateKitchen Kitchen)
    {
        var _Kitchen = new Kitchen
        {
            KitchenId = id,
            Code = Kitchen.Code,
            Name = Kitchen.Name,
            KitchenQueueTime = Kitchen.KitchenQueueTime,
            KitchenStatus = Kitchen.KitchenStatus
        };

        context.Kitchens.Update(_Kitchen);

        await context.SaveChangesAsync();

        return _Kitchen;
    }
}
