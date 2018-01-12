using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Home
    {
        public int HomeId { get; set; }
        public int ManagementCompanyId { get; set; }

        [Required(ErrorMessage = "Street is required", AllowEmptyStrings = false)]
        [MinLength(3, ErrorMessage = "Street min length is 3 characters")]
        public string Street { get; set; }

        [Required(ErrorMessage = "Home number is required", AllowEmptyStrings = false)]
        [MaxLength(6, ErrorMessage = "Home number max length is 6 characters")]
        public int Number { get; set; } 
        public DateTime CreateDate { get; set; }
    }
}