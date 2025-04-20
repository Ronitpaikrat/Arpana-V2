
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface SearchResult {
  id: string;
  title: string;
  image: string;
  author: string;
  tags: string[];
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "Homemade Pasta Carbonara",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhc3RhJTIwY2FyYm9uYXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    author: "ItalianChef",
    tags: ["pasta", "italian", "dinner"]
  },
  {
    id: "2",
    title: "Avocado Toast with Poached Eggs",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZvY2FkbyUyMHRvYXN0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    author: "HealthyEats",
    tags: ["breakfast", "avocado", "healthy"]
  },
  {
    id: "3",
    title: "Chocolate Lava Cake",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hvY29sYXRlJTIwbGF2YSUyMGNha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    author: "SweetTooth",
    tags: ["dessert", "chocolate", "cake"]
  },
  {
    id: "4",
    title: "Spicy Thai Green Curry",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhaSUyMGN1cnJ5fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    author: "SpiceLover",
    tags: ["thai", "curry", "spicy"]
  },
];

const SearchForm: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate search with delay
    setTimeout(() => {
      setResults(
        query.trim() === "" 
          ? [] 
          : mockResults.filter(
              item => 
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.author.toLowerCase().includes(query.toLowerCase()) ||
                item.tags.some(tag => tag.includes(query.toLowerCase()))
            )
      );
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <Input
          placeholder="Search for recipes, users, or tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="submit" 
          className="bg-dishit-orange hover:bg-dishit-orange/90"
          disabled={isSearching}
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {isSearching && (
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-dishit-orange border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-500">Searching for delicious recipes...</p>
        </div>
      )}

      {!isSearching && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          {results.map((result) => (
            <Card key={result.id} className="overflow-hidden">
              <div 
                className="h-40 bg-cover bg-center" 
                style={{ backgroundImage: `url(${result.image})` }}
              />
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  {result.title}
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{result.author.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </CardTitle>
                <p className="text-sm text-gray-500">by @{result.author}</p>
              </CardHeader>
              <CardFooter className="pt-0">
                <div className="flex flex-wrap gap-1">
                  {result.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-dishit-lightGray">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!isSearching && query.trim() !== "" && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl font-medium">No results found</p>
          <p className="text-gray-500 mt-2">Try different keywords or check your spelling</p>
        </div>
      )}

      {!isSearching && query.trim() === "" && (
        <div className="text-center py-12">
          <p className="text-xl font-medium">Popular Searches</p>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {["pasta", "breakfast", "healthy", "dessert", "quick meals", "vegetarian", "snacks"].map(tag => (
              <Badge 
                key={tag}
                className="cursor-pointer bg-dishit-lightGray hover:bg-dishit-gray text-black"
                onClick={() => {
                  setQuery(tag);
                  handleSearch(new Event("submit") as any);
                }}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
