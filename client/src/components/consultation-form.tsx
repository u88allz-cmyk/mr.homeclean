import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertConsultationSchema } from "@shared/schema";

interface ConsultationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialServiceType?: string;
}

const formSchema = insertConsultationSchema.extend({
  name: z.string().min(1, "이름을 입력해주세요"),
  phone: z.string().min(1, "연락처를 입력해주세요").regex(/^[0-9-]+$/, "올바른 연락처를 입력해주세요"),
  serviceType: z.string().min(1, "서비스를 선택해주세요"),
});

export function ConsultationForm({ open, onOpenChange, initialServiceType = "" }: ConsultationFormProps) {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      serviceType: initialServiceType,
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return apiRequest("POST", "/api/consultations", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "상담 신청 완료",
        description: "빠른 시일 내에 연락드리겠습니다.",
      });
      form.reset();
      setTimeout(() => {
        onOpenChange(false);
        setIsSubmitted(false);
      }, 2000);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "오류가 발생했습니다",
        description: "다시 시도해주세요.",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data);
  };

  // Update form when initialServiceType changes
  useEffect(() => {
    if (open) {
      form.setValue("serviceType", initialServiceType);
    }
  }, [initialServiceType, open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" data-testid="dialog-consultation">
        <DialogHeader>
          <DialogTitle className="text-2xl">무료 상담 신청</DialogTitle>
          <DialogDescription>
            정보를 입력해주시면 빠르게 연락드리겠습니다
          </DialogDescription>
        </DialogHeader>
        
        {isSubmitted ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">신청이 완료되었습니다!</h3>
            <p className="text-muted-foreground">빠른 시일 내에 연락드리겠습니다.</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input placeholder="홍길동" {...field} data-testid="input-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>연락처</FormLabel>
                    <FormControl>
                      <Input placeholder="010-1234-5678" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>서비스 종류</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-service">
                          <SelectValue placeholder="서비스를 선택해주세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="입주/이사청소">입주/이사청소</SelectItem>
                        <SelectItem value="사무실/상가 청소">사무실/상가 청소</SelectItem>
                        <SelectItem value="특수청소">특수청소</SelectItem>
                        <SelectItem value="외창청소">외창청소</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>문의내용 (선택)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="추가로 전달하실 내용이 있으면 입력해주세요"
                        className="resize-none"
                        rows={4}
                        {...field}
                        value={field.value || ""}
                        data-testid="textarea-message"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full min-h-11" 
                size="lg"
                disabled={mutation.isPending}
                data-testid="button-submit-consultation"
              >
                {mutation.isPending ? "전송중..." : "상담 신청하기"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
