using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public int HabitantId { get; set; }
        public int ManagementCompanyId { get; set; }
        
        public string Request { get; set; }
        
        public string Response { get; set; }
                
        public DateTime Date { get; set; }
    }
}