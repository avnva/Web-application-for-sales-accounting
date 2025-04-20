﻿namespace OrdersUsersApi.DTO.Order
{
    public class OrderProductDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; } // Добавляем категорию
    }
}
