using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class ManagementCompany
    {
        public int ManagementCompanyId { get; set; }

        [Required(ErrorMessage = "Name is required", AllowEmptyStrings = false)]
        [MinLength(3, ErrorMessage = "Name min length is 3 characters")]
        public string Name { get; set; }

        public DateTime CreateDate { get; set; }       
    }
}