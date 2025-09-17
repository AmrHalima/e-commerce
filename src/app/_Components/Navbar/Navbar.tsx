"use client";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ThemeToggleButton } from "@/components/ui/shadcn-io/theme-toggle-button";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useThemeTransition } from "@/components/ui/shadcn-io/theme-toggle-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, Menu, Settings, ShoppingCart, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CartContext } from "@/context/CartContext";

export default function Navbar() {
    const { resolvedTheme, setTheme } = useTheme();
    const { startTransition } = useThemeTransition();
    const handleThemeToggle = () => {
        startTransition(() => {
            setTheme(resolvedTheme === "dark" ? "light" : "dark");
        });
    };
    const [mounted, setMounted] = useState(false);
    const { cart, loading } = useContext(CartContext);
    useEffect(() => {
        setMounted(true);
    }, []);
    const [mobileOpen, setMobileOpen] = useState(false);
    const paths = [
        { name: "Products", href: "/products" },
        { name: "Cart", href: "/cart" },
        { name: "Brands", href: "/brands" },
        { name: "Categories", href: "/categories" },
        { name: "Orders", href: "/orders" },
        { name: "Wishlist", href: "/wishlist" },
    ];
    return (
        <nav className="w-full fixed top-0 z-50 bg-background">
            <div className="container mx-auto flex justify-between items-center md:p-4 p-2 pb-0">
                {/* Logo */}
                {!mounted ? (
                    <div className="h-[64px] w-[137px]"></div>
                ) : (
                    <Link href="/">
                        <Image
                            src={
                                resolvedTheme === "dark"
                                    ? "/logoDark.svg"
                                    : "/logo.svg"
                            }
                            alt="Halima logo"
                            width={137}
                            height={64}
                            priority
                        />
                    </Link>
                )}

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-1 justify-center">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {paths.map(({ name, href }) => (
                                <NavigationMenuItem key={name}>
                                    <NavigationMenuLink
                                        asChild
                                        className={
                                            "lg:p-2 lg:mx-2 lg:flex-row flex flex-col items-center"
                                        }
                                    >
                                        <Link href={href}>{name}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2">
                    {/* Avatar Popover */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>SC</AvatarFallback>
                                </Avatar>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56" align="end">
                            <div className="flex items-center space-x-2 p-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src="./loading.svg"
                                        alt="avatar"
                                    />
                                    <AvatarFallback>SC</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <h5 className="text-sm font-semibold">
                                        @shadcn
                                    </h5>
                                    <p className="text-xs text-muted-foreground">
                                        shadcn@example.com
                                    </p>
                                </div>
                            </div>
                            <hr className="my-2" />
                            <div className="grid gap-1">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    size="sm"
                                >
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    size="sm"
                                >
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Button>
                                <hr className="my-1" />
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    size="sm"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                    {/* Theme Toggle */}
                    {!mounted ? (
                        <div className="h-8 w-8"></div>
                    ) : (
                        <ThemeToggleButton
                            theme={resolvedTheme === "dark" ? "dark" : "light"}
                            onClick={handleThemeToggle}
                            variant="circle"
                            start="top-right"
                            className="h-8 w-8 rounded-full border-0"
                        />
                    )}
                    {/* Cart */}
                    <Link href={"/cart"} aria-label="Cart">
                        <div className="relative p-1.5 cursor-pointer">
                            {!loading && cart && cart.numOfCartItems > 0 && (
                                <Badge className="absolute top-0 end-0 h-4 min-w-3 rounded-full p-1 text-xs font-semi-bold translate-x-1/2">
                                    {cart.numOfCartItems}
                                </Badge>
                            )}
                            <ShoppingCart />
                        </div>
                    </Link>
                    {/* Hamburger for mobile */}
                    <button
                        className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring"
                        onClick={(e) => {
                            e.preventDefault();
                            setMobileOpen((v) => !v);
                        }}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-controls="mobile-navigation"
                        aria-expanded={mobileOpen}
                        aria-haspopup="true"
                        tabIndex={0}
                        type="button"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
            {/* Mobile Navigation Drawer */}
            {mobileOpen && (
                <div
                    id="mobile-navigation"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobile navigation"
                    className="md:hidden fixed inset-0 z-50 bg-background/90 backdrop-blur-sm"
                >
                    <div className="flex flex-col items-center justify-center h-full gap-6">
                        {paths.map(({ name, href }) => (
                            <Link
                                key={name}
                                href={href}
                                className="text-lg font-medium px-4 py-2 rounded hover:bg-accent transition"
                                tabIndex={0}
                                aria-label={name}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setMobileOpen(false);
                                    window.location.href = href;
                                }}
                            >
                                {name}
                            </Link>
                        ))}
                        <button
                            className="mt-8 px-4 py-2 rounded bg-muted-foreground text-background"
                            onClick={(e) => {
                                e.preventDefault();
                                setMobileOpen(false);
                            }}
                            aria-label="Close menu"
                            type="button"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
