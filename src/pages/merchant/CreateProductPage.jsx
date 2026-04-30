import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Package, ImagePlus, ArrowLeft, DollarSign, Boxes } from "lucide-react";
import { Button, Input, PageHeader, Breadcrumb } from "@/components/ui";
import { ROUTES } from "@/utils/constants";
import { v4 as uuidv4 } from "uuid";
import { products as mockProducts } from "@/data/mockDatabase.js";
import styles from "./CreateProductPage.module.css";

export default function CreateProductPage() {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = "Product name is required";
    if (!form.price) errs.price = "Price is required";
    if (!form.stock) errs.stock = "Stock is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);

    const newProduct = {
      id: uuidv4(),
      storeId,
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
      category: form.category,
      description: form.description,
      image: form.image,
      rating: 0,
    };

    const existing =
      JSON.parse(localStorage.getItem("products")) || mockProducts;

    localStorage.setItem(
      "products",
      JSON.stringify([...existing, newProduct])
    );

    setTimeout(() => {
      navigate(`/stores/${storeId}/products`);
    }, 400);
  };

  return (
    <div className="page-enter">
      <PageHeader
        title="Create Product"
        subtitle="Add a new product to your store"
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Dashboard", to: ROUTES.DASHBOARD },
              { label: "Store", to: `/stores/${storeId}` },
              { label: "Create Product" },
            ]}
          />
        }
        actions={
          <Button
            variant="ghost"
            leftIcon={<ArrowLeft size={15} />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        }
      />

      <div className={styles.layout}>
        {/* ================= FORM ================= */}
        <form className={styles.form} onSubmit={handleSubmit}>
          
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Package size={18} />
              <h2>Product details</h2>
            </div>

            <div className={styles.fields}>
              <Input
                label="Product name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                leftIcon={<Package size={14} />}
              />

              <Input
                label="Price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                error={errors.price}
                leftIcon={<DollarSign size={14} />}
              />

              <Input
                label="Stock"
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                error={errors.stock}
                leftIcon={<Boxes size={14} />}
              />

              <Input
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
              />

              <Input
                label="Description"
                type="textarea"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
              />

              {/* IMAGE UPLOAD */}
              <div className={styles.uploadBox}>
                <label className={styles.uploadLabel}>
                  <ImagePlus size={16} />
                  Upload Product Image
                  <input type="file" hidden onChange={handleImageUpload} />
                </label>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
              Cancel
            </Button>

            <Button variant="gold" type="submit" isLoading={isSubmitting}>
              Create Product
            </Button>
          </div>
        </form>

        {/* ================= PREVIEW ================= */}
        <div className={styles.preview}>
          <div className={styles.previewCard}>
            <p className={styles.previewLabel}>Live Preview</p>

            <div className={styles.productCard}>
              {previewImage ? (
                <img src={previewImage} alt="product" />
              ) : (
                <div className={styles.imagePlaceholder}>No Image</div>
              )}

              <div className={styles.productInfo}>
                <h3>{form.name || "Product Name"}</h3>
                <p>${form.price || "0.00"}</p>
                <span>{form.category || "Category"}</span>
              </div>
            </div>

            <p className={styles.description}>
              {form.description || "Product description will appear here..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}