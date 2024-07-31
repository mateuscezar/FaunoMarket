
namespace Fauno.CrossCutting.Configuration
{
    public class ActionResponse
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public object? Data { get; set; }

        public static ActionResponse Ok(object? data = null)
        {
            return new ActionResponse
            {
                Success = true,
                Data = data
            };
        }

        public static ActionResponse Fail(string message)
        {
            return new ActionResponse
            {
                Success = false,
                Message = message
            };
        }
    }

    public class ActionResponse<T>
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public T? Data { get; set; }

        public static ActionResponse<T> Ok(T data)
        {
            return new ActionResponse<T>
            {
                Success = true,
                Data = data
            };
        }

        public static ActionResponse<T> Fail(string message)
        {
            return new ActionResponse<T>
            {
                Success = false,
                Message = message,
                Data = default(T)
            };
        }
    }

    public class ActionStatusResponse<T>
    {
        public bool Status { get; set; }
        public string? Message { get; set; }
        public T? Data { get; set; }
    }
}
