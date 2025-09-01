import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ 
  message = "Something went wrong while searching for books.", 
  onRetry 
}: ErrorMessageProps) => {
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="flex flex-col items-center text-center p-8">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-muted-foreground mb-6">
          {message}
        </p>
        
        {onRetry && (
          <Button 
            onClick={onRetry}
            variant="outline" 
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorMessage;