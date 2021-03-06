﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Habitant
    {
        public int HomeId { get; set; }
        public int HabitantId { get; set; }
        public int ManagementCompanyId { get; set; }

        //[Required(ErrorMessage = "Name is required", AllowEmptyStrings = false)]
        //[MinLength(4, ErrorMessage = "Name min length is 6 characters")]
        //[MaxLength(12, ErrorMessage = "Surname max length is 10 characters")]
        public string Name { get; set; }

        //[Required(ErrorMessage = "Surname is required", AllowEmptyStrings = false)]
        //[MinLength(3, ErrorMessage = "Surname min length is 2 characters")]
        //[MaxLength(12, ErrorMessage = "Surname max length is 10 characters")]
        public string Surname { get; set; }

        //[Required(ErrorMessage = "Apartment is required", AllowEmptyStrings = false)]
        public int Apartment { get; set; }

        public string Email { get; set; }

        public DateTime CreateDate { get; set; }
    }
}