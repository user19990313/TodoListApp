using Microsoft.AspNetCore.Mvc;

namespace TodoListApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoListController : ControllerBase
    {
        // GET: api/todolist
        [HttpGet]
        public IEnumerable<TodoItem> GetAll()
        {
            return Database.Instance.GetItems();
        }

        // GET: api/todolist/5
        [HttpGet("{id}")]
        [ProducesResponseType<TodoItem>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Get(int id)
        {
            TodoItem item=Database.Instance.GetItem(id);
            return item == null ? NotFound() : Ok(item);
        }

        // POST: api/todolist/create
        [HttpPost("create")]
        public ActionResult Create([FromBody]string title)
        {
            Database.Instance.CreateItem(title);
            return Ok();
        }

        // GET: api/todolist/5/toggle
        [HttpGet("{id}/toggle")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Toggle(int id)
        {
            if(Database.Instance.ToggleItem(id))
                return Ok();
            return NotFound();
        }

        // POST: api/todolist/5/edit
        [HttpPost("{id}/edit")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Edit(int id, [FromBody]string title)
        {
            if(Database.Instance.EditItem(id, title))
                return Ok();
            return NotFound();
        }

        // GET: api/todolist/5/delete
        [HttpGet("{id}/delete")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(int id)
        {
            if (Database.Instance.DeleteItem(id))
                return Ok();
            return NotFound();
        }
    }
}
