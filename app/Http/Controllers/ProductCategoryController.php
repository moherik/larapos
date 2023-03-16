<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductCategoryRequest;
use App\Http\Requests\UpdateProductCategoryRequest;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{
    public function index()
    {
        $categories = ProductCategory::with('parent')->orderBy('parent_id', 'desc')->get();
        $parents[] = ["value" => "", "text" => "Parent"];
        foreach ($categories as $category) {
            if (!$category->parent_id) {
                $parents[] = ["value" => $category->id, "text" => $category->name];
            }
        }

        return Inertia::render('Product/ProductCategory', [
            "categories" => $categories,
            "parents" => $parents
        ]);
    }

    public function store(StoreProductCategoryRequest $request)
    {
        $category = ProductCategory::create([
            "name" => $request->name,
            "slug" => $request->slug,
            "description" => $request->description,
            "parent_id" => $request->level,
        ]);

        if ($request->icon) {
            $category->addMedia($request->icon)->toMediaCollection();
        }
    }

    public function update(UpdateProductCategoryRequest $request, $id)
    {
        ProductCategory::where('id', $id)->update([
            'name' => $request->name,
            'slug' => $request->slug,
            'description' => $request->description,
            'parent_id' => $request->level,
        ]);
    }

    public function destroy($id)
    {
        ProductCategory::where('id', $id)->delete();
    }
}
