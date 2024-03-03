import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
const ringSizeOptions = [
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
  "12.5",
  "13",
  "13.5",
];
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  mainImage: z.string().url(),
  sideImages: z.array(z.string().url()),
  tags: z.array(z.string()),
  queryName: z.string().min(2, "Query Name must be at least 2 characters."),
  ringSizes: z.array(z.string()).optional(),
});

export default function ProductForm({
  editingProduct,
}: {
  editingProduct?: string;
}) {
  const defaultValues = {
    name: "",
    description: "",
    price: "",
    mainImage: "",
    sideImages: [],
    tags: [],
    ringSizes: [],
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  const [editingProductId, setEditingProductId] = useState<string | undefined>(
    undefined
  );
  const [selectedRingSizes, setSelectedRingSizes] = useState<string[]>([]);

  const isRingProduct = React.useMemo(
    () => form.getValues("tags").includes("Пръстен"),
    [form.watch("tags")]
  );
  const toggleEditMode = () => {
    form.reset(defaultValues);
    setEditingProductId(undefined);
  };

  useEffect(() => {
    setEditingProductId(editingProduct);
  }, [editingProduct]);

  useEffect(() => {
    if (!!editingProductId) {
      const fetchProductDetails = async () => {
        try {
          const productDoc = await getDoc(
            doc(db, "products", editingProductId)
          );
          if (productDoc.exists()) {
            const productData = productDoc.data();
            const sideImages = productData.sideImages.slice(1);
            form.setValue("name", productData.name);
            form.setValue("description", productData.description);
            form.setValue("price", productData.price);
            form.setValue("mainImage", productData.mainImage);
            form.setValue("sideImages", sideImages.join(","));
            form.setValue("queryName", productData.queryName);
            form.setValue("tags", productData.tags);
          }
        } catch (error) {
          console.error("Error fetching product details: ", error);
        }
      };

      fetchProductDetails();
    }
  }, [editingProductId, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.sideImages.unshift(values.mainImage);
    const encodedDescription = values.description.replace(/\n/g, "\\n");
    values.description = encodedDescription;
    values.ringSizes = selectedRingSizes;

    try {
      if (!!editingProductId) {
        await setDoc(doc(db, "products", editingProductId), values);
      } else {
        const docRef = await addDoc(collection(db, "products"), values);
        console.log("Product added with ID: ", docRef.id);
      }
      form.reset(defaultValues);
    } catch (error) {
      console.error(
        !!editingProductId
          ? "Error updating product: "
          : "Error adding product: ",
        error
      );
    }
  }
  const handleRingSizesChange = (sizes: string[]) => {
    setSelectedRingSizes(sizes);
    console.log(...sizes);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product Name"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);

                      form.setValue("queryName", e.target.value.toLowerCase());
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is the name of the product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Product Price" {...field} />
                </FormControl>
                <FormDescription>Enter the price in LEV.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="whitespace-pre-line"
                  placeholder="Product Description"
                  {...field}
                  // Add an onChange handler with an explicit event type
                  onFocus={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    field.onChange(e.target.value.replace(/\\n/g, "\n"));
                  }}
                />
              </FormControl>
              <FormDescription>
                Provide a description for the product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mainImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Main Image URL" {...field} />
              </FormControl>
              <FormDescription>URL of the main product image.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sideImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Side Images URLs</FormLabel>
              <FormControl>
                <Input
                  placeholder="Side Images URLs (comma-separated)"
                  {...field}
                  onFocus={(e) => {
                    const inputString = e.target.value;
                    const sideImagesArray = inputString
                      .split(",")
                      .map((url) => url.trim());
                    field.onChange(sideImagesArray);
                  }}
                />
              </FormControl>
              <FormDescription>
                URLs of side images, separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter tags (comma-separated)"
                  {...field}
                  onChange={(e) => {
                    const inputString = e.target.value;
                    const tagsArray = inputString
                      .split(",")
                      .map((url) => url.trim());
                    field.onChange(tagsArray);
                  }}
                />
              </FormControl>
              <FormDescription>Product tags</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isRingProduct && (
          <FormItem>
            <FormLabel>Available Ring Sizes</FormLabel>
            <FormControl>
              {/* Use the ToggleGroup from your UI library */}
              <ToggleGroup
                type="multiple"
                value={selectedRingSizes}
                onValueChange={handleRingSizesChange}
              >
                {ringSizeOptions.map((size) => (
                  <ToggleGroupItem key={size} value={size}>
                    {size}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </FormControl>
            <FormDescription>
              Select available sizes for this ring.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}

        <Button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => console.log(form.formState.errors)}
        >
          {!!editingProductId ? "Update Product" : "Add Product"}
        </Button>

        {!!editingProductId && (
          <Button
            type="button"
            onClick={toggleEditMode}
            className="px-4 py-2 mx-4 rounded"
          >
            Cancel Editing
          </Button>
        )}
      </form>
    </Form>
  );
}
