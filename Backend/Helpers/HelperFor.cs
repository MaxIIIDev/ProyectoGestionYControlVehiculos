

public class HelperFor
{
    public static void ShowErrorMessageInConsole(string className, string methodName, string message) => Console.WriteLine($"Error en la clase: {className} , en el metodo: {methodName} , con el siguiente error: {message}");
}