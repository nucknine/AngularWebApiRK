using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Hosting;
using WebAPI.Models;

namespace APM.WebAPI.Models
{
    /// <summary>
    /// Stores the data in a json file so that no database is required for this
    /// sample application
    /// </summary>
    public class HabitantRepository
    {
        /// <summary>
        /// Creates a new habitant with default values
        /// </summary>
        /// <returns></returns>
        internal Habitant HabitantCreate()
        {
            Habitant habitant = new Habitant
            {
                CreateDate = DateTime.Now
            };
            return habitant;
        }

        /// <summary>
        /// Retrieves the list of habitants.
        /// </summary>
        /// <returns></returns>
        internal List<Habitant> HabitantRetrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/habitants.json");

            var json = System.IO.File.ReadAllText(filePath);

            var habitants = JsonConvert.DeserializeObject<List<Habitant>>(json);

            return habitants;
        }

        /// <summary>
        /// Saves a new habitant.
        /// </summary>
        /// <param name="habitant"></param>
        /// <returns></returns>
        internal Habitant HabitantSave(Habitant habitant)
        {
            // Read in the existing habitants
            var habitants = this.HabitantRetrieve();

            // Assign a new Id
            var maxId = habitants.Max(p => p.HabitantId);
            habitant.HabitantId = maxId + 1;
            habitants.Add(habitant);

            HabitantWriteData(habitants);
            return habitant;
        }

        /// <summary>
        /// Updates an existing habitant
        /// </summary>
        /// <param name="id"></param>
        /// <param name="habitant"></param>
        /// <returns></returns>
        internal Habitant Save(int id, Habitant habitant)
        {
            // Read in the existing habitants
            var habitants = this.HabitantRetrieve();

            // Locate and replace the item
            var itemIndex = habitants.FindIndex(p => p.HabitantId == habitant.HabitantId);
            if (itemIndex > 0)
            {
                habitants[itemIndex] = habitant;
            }
            else
            {
                return null;
            }

            HabitantWriteData(habitants);
            return habitant;
        }


        private bool HabitantWriteData(List<Habitant> habitants)
        {
            // Write out the Json
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/habitants.json");

            var json = JsonConvert.SerializeObject(habitants, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);

            return true;
        }

    }
}