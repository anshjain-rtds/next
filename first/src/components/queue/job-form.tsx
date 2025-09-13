// components/queue/job-form.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface JobFormProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
  children?: React.ReactNode;
}

export function JobForm({
  title,
  description,
  icon: Icon,
  children,
}: JobFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}
