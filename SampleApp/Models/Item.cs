namespace WebApp.Models
{
    public class Item
    {
        public required string  Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
    }
}