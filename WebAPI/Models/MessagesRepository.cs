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
    public class MessageRepository
    {
        /// <summary>
        /// Creates a new Message with default values
        /// </summary>
        /// <returns></returns>
        internal Message Create()
        {
            Message message = new Message
            {
                Date = DateTime.Now
            };
            return message;
        }

        /// <summary>
        /// Retrieves the list of Messages.
        /// </summary>
        /// <returns></returns>
        internal List<Message> Retrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/messages.json");

            var json = System.IO.File.ReadAllText(filePath);

            var messages = JsonConvert.DeserializeObject<List<Message>>(json);

            return messages;
        }

        /// <summary>
        /// Saves a new message.
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        internal Message Save(Message message)
        {
            // Read in the existing messages
            var messages = this.Retrieve();

            // Assign a new Id
            var maxId = messages.Max(p => p.MessageId);
            message.MessageId = maxId + 1;
            messages.Add(message);

            WriteData(messages);
            return message;
        }

        /// <summary>
        /// Updates an existing message
        /// </summary>
        /// <param name="id"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        internal Message Save(int id, Message message)
        {
            // Read in the existing messages
            var messages = this.Retrieve();

            // Locate and replace the item
            var itemIndex = messages.FindIndex(p => p.MessageId == message.MessageId);
            if (itemIndex > 0)
            {
                messages[itemIndex] = message;
            }
            else
            {
                return null;
            }

            WriteData(messages);
            return message;
        }


        private bool WriteData(List<Message> messages)
        {
            // Write out the Json
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/messages.json");

            var json = JsonConvert.SerializeObject(messages, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);

            return true;
        }

    }
}