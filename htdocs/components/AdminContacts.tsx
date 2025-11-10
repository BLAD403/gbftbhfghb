import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "@/hooks/use-toast";

interface ContactEntry {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export const AdminContacts = () => {
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("contact_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setContacts(data || []);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display">Contact Form Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <p className="text-muted-foreground">No contact entries yet.</p>
          ) : (
            contacts.map((contact) => (
              <div key={contact.id} className="p-4 border rounded space-y-2">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{contact.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{contact.email}</p>
                <p className="text-sm">{contact.message}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};