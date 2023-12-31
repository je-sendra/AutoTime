namespace VewTech.AutoTime.Middleware;

public class Program
{
    public static void Main(string[] args)
    {

        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (true)//(app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

 
        app.UseCors(
                options => options.WithOrigins(
                    "https://autotime.azurewebsites.net",
                    "https://autotime-react.azurewebsites.net",
                    "http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
            );

        app.UseHttpsRedirection();

       

        app.UseAuthorization();

        app.MapControllers();

        app.Run();

    }
}