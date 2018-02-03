using APM.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.Http.OData;
using WebAPI.Models;

namespace APM.WebAPI.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class MessagesController : ApiController
    {
        // GET: api/Messages
        [EnableQuery()]
        [ResponseType(typeof(Message))]
        public IHttpActionResult Get()
        {
            try
            {
                var messageRepository = new MessageRepository();
                return Ok(messageRepository.Retrieve().AsQueryable());

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
                
        // GET: api/Messages/5
        [ResponseType(typeof(Message))]        
        public IHttpActionResult Get(int id)
        {
            try
            {
                Message message;
                var messageRepository = new MessageRepository();

                if (id > 0)
                {
                    var messages = messageRepository.Retrieve();
                    message = messages.FirstOrDefault(p => p.MessageId == id);
                    if (message == null)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    message = messageRepository.Create();
                }
                return Ok(message);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        

        // POST: api/Messages
        [ResponseType(typeof(Message))]
        public IHttpActionResult Post([FromBody]Message message)
        {
            try
            {
                if (message == null)
                {
                    return BadRequest("Message cannot be null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var messageRepository = new Models.MessageRepository();
                var newMessage = messageRepository.Save(message);
                if (newMessage == null)
                {
                    return Conflict();
                }
                return Created<Message>(Request.RequestUri + newMessage.MessageId.ToString(),
                    newMessage);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/Messages/5
        public IHttpActionResult Put(int id, [FromBody]Message message)
        {
            try
            {
                if (message == null)
                {
                    return BadRequest("Message cannot be null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var messageRepository = new Models.MessageRepository();
                var updatedMessage = messageRepository.Save(id, message);
                if (updatedMessage == null)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE: api/Messages/5
        public void Delete(int id)
        {
        }
    }
}
