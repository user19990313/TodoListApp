namespace TodoListApp.Server
{
    public class Database
    {
        private static readonly Database _instance;
        public static Database Instance {  get { return _instance; } }

        static Database()
        {
            _instance = new Database();
        }

        Dictionary<int,TodoItem> items = new Dictionary<int,TodoItem>();
        int next_id = 0;

        public IEnumerable<TodoItem> GetItems()
        {
            return
                (from item in items.Values where !item.IsDeleted select item);
        }

        public TodoItem GetItem(int id)
        {
            if(items.ContainsKey(id)) return items[id];
            return null;
        }

        public bool EditItem(int id, string title)
        {
            if (items.ContainsKey(id) && !items[id].IsDeleted)
            {
                items[id].Title = title;
                return true;
            }
            return false;
        }

        public bool ToggleItem(int id)
        {
            if(items.ContainsKey(id) && !items[id].IsDeleted)
            {
                TodoItem item = items[id];
                item.IsCompleted=!item.IsCompleted;
                return true;
            }
            return false;
        }

        public bool DeleteItem(int id)
        {
            if (items.ContainsKey(id) && !items[id].IsDeleted)
            {
                items[id].IsDeleted = true;
                return true;
            }
            return false;
        }

        public void CreateItem(string title)
        {
            TodoItem item = new TodoItem { Id = next_id, Title = title};
            items.Add(next_id++, item);
        }
    }
}
