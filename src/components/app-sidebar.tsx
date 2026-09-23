import { BookOpen, Calendar, Home, Settings } from "lucide-react";
import { Link, useLocation } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/mock-data";

const items = [
  { title: "หน้าแรก", url: "/", icon: Home },
  { title: "ลงทะเบียนเรียน", url: "/enrollment", icon: BookOpen },
  { title: "ตารางเรียน", url: "/schedule", icon: Calendar },
  { title: "ตั้งค่า", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-1 text-sm font-semibold">CPE & ISNE</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    render={<Link to={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Separator className="mb-4" />
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={currentUser.avatar} alt={currentUser.nickname} />
            <AvatarFallback>{currentUser.nickname.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start gap-1">
            <span className="text-xs font-semibold leading-none">
              {currentUser.nickname}
            </span>
            <Badge variant="outline" className="px-1.5 py-0 text-[10px] uppercase">
              {currentUser.role}
            </Badge>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}