using TBRapp.Model;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Net;

namespace TBRapp.Controllers;
[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly TBRappContext context;

    public UserController(TBRappContext context)
    {
        this.context = context;
    }


    [HttpGet("{email}/{code}")]
    public async Task<ActionResult<bool>> Login(string email, string code)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
        var kitchen = await context.Kitchens.FirstOrDefaultAsync(k => k.Code == code);

        return user != null && kitchen != null;       
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await context.Users.Include(u => u.Orders).ThenInclude(o => o.OrderLines).FirstOrDefaultAsync(u => u.UserId == id);
        return user != null ? user : NotFound();
    }

    [HttpGet]
    public async Task<ActionResult<List<User>>> ListUsers()
    {
        return await context.Users.Include(u => u.Orders).ThenInclude(o => o.OrderLines).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<User>> AddUser([FromBody] CreateUser user)
    {
        if(string.IsNullOrWhiteSpace(user.Email = user.Email.Trim()))
        {
            return BadRequest(nameof(user.Email));
        }

        if(string.IsNullOrWhiteSpace(user.FirstName = user.FirstName.Trim()))
        {
            return BadRequest(nameof(user.FirstName));
        }

        if(string.IsNullOrWhiteSpace(user.LastName = user.LastName.Trim()))
        {
            return BadRequest(nameof(user.LastName));
        }

        var existingUser = await context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

        if(existingUser != null)
        {
            return StatusCode((int)HttpStatusCode.Conflict);
        }

        var _user = new User
        {
            Active = user.Active,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName
        };

        context.Users.Add(_user);

        await context.SaveChangesAsync();

        return _user;
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<User>> UpdateUser(int id, [FromBody] CreateUser user)
    {
        if(id < 1)
        {
            return BadRequest(nameof(id));
        }

        if(string.IsNullOrWhiteSpace(user.Email = user.Email.Trim()))
        {
            return BadRequest(nameof(user.Email));
        }

        if(string.IsNullOrWhiteSpace(user.FirstName = user.FirstName.Trim()))
        {
            return BadRequest(nameof(user.FirstName));
        }

        if(string.IsNullOrWhiteSpace(user.LastName = user.LastName.Trim()))
        {
            return BadRequest(nameof(user.LastName));
        }

        var existingUser = await context.Users.FirstOrDefaultAsync(u => u.Email == user.Email && u.UserId != id);

        if(existingUser != null)
        {
            return StatusCode((int)HttpStatusCode.Conflict);
        }

        var _user = new User
        {
            UserId = id,
            Active = user.Active,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName
        };

        context.Users.Update(_user);

        await context.SaveChangesAsync();

        return _user;
    }
}
