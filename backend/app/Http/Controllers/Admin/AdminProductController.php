<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminProductController extends Controller
{
    public function add(Request $req)
    {

        $validation = Validator::make($req->all(), [
            'category' => 'required|string',
            'tags' => 'required',
            'title' => 'required|string|max:50',
            'slug' => 'required|string|max:50',
            'desc' => 'required|string|max:500',
            'newPrice' => 'required',
            'isNew' => 'required',
            'sizes' => 'required',
            'colors' => 'required',

            //For color 0
            'color0image0' => 'required|mimes:webp|max:500',
            'color0image1' => 'required|mimes:webp|max:500',
            'color0image2' => 'required|mimes:webp|max:500',
            'color0image3' => 'required|mimes:webp|max:500',

            //For color 1
            'color1image0' => 'mimes:webp|max:500',
            'color1image1' => 'mimes:webp|max:500',
            'color1image2' => 'mimes:webp|max:500',
            'color1image3' => 'mimes:webp|max:500',

            //For color 2
            'color2image0' => 'mimes:webp|max:500',
            'color2image1' => 'mimes:webp|max:500',
            'color2image2' => 'mimes:webp|max:500',
            'color2image3' => 'mimes:webp|max:500',

            //For color 3
            'color3image0' => 'mimes:webp|max:500',
            'color3image1' => 'mimes:webp|max:500',
            'color3image2' => 'mimes:webp|max:500',
            'color3image3' => 'mimes:webp|max:500',
        ], [
            'category.required' => 'Category is required.',
            'tags.required' => 'Tags are required.',
            'title.required' => 'Title is required.',
            'slug.required' => 'Slug is required.',
            'desc.required' => 'Description is required.',
            'newPrice.required' => 'New Price is required.',
            'isNew.required' => 'Please mark new as check or uncheck.',
            'sizes.required' => 'Sizes are required.',
            'colors.required' => 'Colors are required.',

            //For color 0
            'color0image0.required' => 'Images for color 1 are required.',
            'color0image0.mimes:webp' => 'Images should be type of "webp".',
            'color0image0.max:500' => 'Images can be max 500kb.',

            'color0image1.required' => 'Images for color 1 are required.',
            'color0image1.mimes:webp' => 'Images should be type of "webp".',
            'color0image1.max:500' => 'Images can be max 500kb.',

            'color0image2.required' => 'Images for color 1 are required.',
            'color0image2.mimes:webp' => 'Images should be type of "webp".',
            'color0image2.max:500' => 'Images can be max 500kb.',

            'color0image3.required' => 'Images for color 1 are required.',
            'color0image3.mimes:webp' => 'Images should be type of "webp".',
            'color0image3.max:500' => 'Images can be max 500kb.',

            //For color 1
            'color1image0.mimes:webp' => 'Images should be type of "webp".',
            'color1image0.max:500' => 'Images can be max 500kb.',

            'color1image1.mimes:webp' => 'Images should be type of "webp".',
            'color1image1.max:500' => 'Images can be max 500kb.',

            'color1image2.mimes:webp' => 'Images should be type of "webp".',
            'color1image2.max:500' => 'Images can be max 500kb.',

            'color1image3.mimes:webp' => 'Images should be type of "webp".',
            'color1image3.max:500' => 'Images can be max 500kb.',

            //For color 2
            'color2image0.mimes:webp' => 'Images should be type of "webp".',
            'color2image0.max:500' => 'Images can be max 500kb.',

            'color2image1.mimes:webp' => 'Images should be type of "webp".',
            'color2image1.max:500' => 'Images can be max 500kb.',

            'color2image2.mimes:webp' => 'Images should be type of "webp".',
            'color2image2.max:500' => 'Images can be max 500kb.',

            'color2image3.mimes:webp' => 'Images should be type of "webp".',
            'color2image3.max:500' => 'Images can be max 500kb.',

            //For color 3
            'color3image0.mimes:webp' => 'Images should be type of "webp".',
            'color3image0.max:500' => 'Images can be max 500kb.',

            'color3image1.mimes:webp' => 'Images should be type of "webp".',
            'color3image1.max:500' => 'Images can be max 500kb.',

            'color3image2.mimes:webp' => 'Images should be type of "webp".',
            'color3image2.max:500' => 'Images can be max 500kb.',

            'color3image3.mimes:webp' => 'Images should be type of "webp".',
            'color3image3.max:500' => 'Images can be max 500kb.',

        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validation->errors()
            ], 401);
        }

        $product = Product::create([
            'category' => $req->category,
            'tags' => $req->tags,
            'title' => $req->title,
            'slug' => $req->slug,
            'desc' => $req->desc,
            'oldPrice' => $req->oldPrice,
            'newPrice' => $req->newPrice,
            'isNew' => $req->isNew,
            'status' => true,
            'avail' => true,
            'sizes' => $req->sizes,
            'colors' => $req->colors,
        ]);

        $data = Product::find($product->id);

        // for color 0
        if (!empty($req->file('color0image0'))) {
            $file00 =  $req->file('color0image0');
            $file00Name = time() . md5($file00->getClientOriginalName()) . '.' . $file00->getClientOriginalExtension();
            $file00->move(public_path() . '/uploads/productImages', $file00Name);

            $data->color0image0 = $file00Name;
        }
        if (!empty($req->file('color0image1'))) {
            $file01 =  $req->file('color0image1');
            $file01Name = time() . md5($file01->getClientOriginalName()) . '.' . $file01->getClientOriginalExtension();
            $file01->move(public_path() . '/uploads/productImages', $file01Name);

            $data->color0image1 = $file01Name;
        }
        if (!empty($req->file('color0image2'))) {
            $file02 =  $req->file('color0image2');
            $file02Name = time() . md5($file02->getClientOriginalName()) . '.' . $file02->getClientOriginalExtension();
            $file02->move(public_path() . '/uploads/productImages', $file02Name);

            $data->color0image2 = $file02Name;
        }
        if (!empty($req->file('color0image3'))) {
            $file03 =  $req->file('color0image3');
            $file03Name = time() . md5($file03->getClientOriginalName()) . '.' . $file03->getClientOriginalExtension();
            $file03->move(public_path() . '/uploads/productImages', $file03Name);

            $data->color0image3 = $file03Name;
        }

        // for color 1
        if (!empty($req->file('color1image0'))) {
            $file10 =  $req->file('color1image0');
            $file10Name = time() . md5($file10->getClientOriginalName()) . '.' . $file10->getClientOriginalExtension();
            $file10->move(public_path() . '/uploads/productImages', $file10Name);

            $data->color1image0 = $file10Name;
        }
        if (!empty($req->file('color1image1'))) {
            $file11 =  $req->file('color1image1');
            $file11Name = time() . md5($file11->getClientOriginalName()) . '.' . $file11->getClientOriginalExtension();
            $file11->move(public_path() . '/uploads/productImages', $file11Name);

            $data->color1image1 = $file11Name;
        }
        if (!empty($req->file('color1image2'))) {
            $file12 =  $req->file('color1image2');
            $file12Name = time() . md5($file12->getClientOriginalName()) . '.' . $file12->getClientOriginalExtension();
            $file12->move(public_path() . '/uploads/productImages', $file12Name);

            $data->color1image2 = $file12Name;
        }
        if (!empty($req->file('color1image3'))) {
            $file13 =  $req->file('color1image3');
            $file13Name = time() . md5($file13->getClientOriginalName()) . '.' . $file13->getClientOriginalExtension();
            $file13->move(public_path() . '/uploads/productImages', $file13Name);

            $data->color1image3 = $file13Name;
        }

        // for color 2
        if (!empty($req->file('color2image0'))) {
            $file20 =  $req->file('color2image0');
            $file20Name = time() . md5($file20->getClientOriginalName()) . '.' . $file20->getClientOriginalExtension();
            $file20->move(public_path() . '/uploads/productImages', $file20Name);

            $data->color2image0 = $file20Name;
        }
        if (!empty($req->file('color2image1'))) {
            $file21 =  $req->file('color2image1');
            $file21Name = time() . md5($file21->getClientOriginalName()) . '.' . $file21->getClientOriginalExtension();
            $file21->move(public_path() . '/uploads/productImages', $file21Name);

            $data->color2image1 = $file21Name;
        }
        if (!empty($req->file('color2image2'))) {
            $file22 =  $req->file('color2image2');
            $file22Name = time() . md5($file22->getClientOriginalName()) . '.' . $file22->getClientOriginalExtension();
            $file22->move(public_path() . '/uploads/productImages', $file22Name);

            $data->color2image2 = $file22Name;
        }
        if (!empty($req->file('color2image3'))) {
            $file23 =  $req->file('color2image3');
            $file23Name = time() . md5($file23->getClientOriginalName()) . '.' . $file23->getClientOriginalExtension();
            $file23->move(public_path() . '/uploads/productImages', $file23Name);

            $data->color2image3 = $file23Name;
        }

        // for color 3
        if (!empty($req->file('color3image0'))) {
            $file30 =  $req->file('color3image0');
            $file30Name = time() . md5($file30->getClientOriginalName()) . '.' . $file30->getClientOriginalExtension();
            $file30->move(public_path() . '/uploads/productImages', $file30Name);

            $data->color3image0 = $file30Name;
        }
        if (!empty($req->file('color3image1'))) {
            $file31 =  $req->file('color3image1');
            $file31Name = time() . md5($file31->getClientOriginalName()) . '.' . $file31->getClientOriginalExtension();
            $file31->move(public_path() . '/uploads/productImages', $file31Name);

            $data->color3image1 = $file31Name;
        }
        if (!empty($req->file('color3image2'))) {
            $file32 =  $req->file('color3image2');
            $file32Name = time() . md5($file32->getClientOriginalName()) . '.' . $file32->getClientOriginalExtension();
            $file32->move(public_path() . '/uploads/productImages', $file32Name);

            $data->color3image2 = $file32Name;
        }
        if (!empty($req->file('color3image3'))) {
            $file33 =  $req->file('color3image3');
            $file33Name = time() . md5($file33->getClientOriginalName()) . '.' . $file33->getClientOriginalExtension();
            $file33->move(public_path() . '/uploads/productImages', $file33Name);

            $data->color3image3 = $file33Name;
        }
        $data->save();

        if ($data) {
            return response()->json([
                'status' => true,
                'data' => $data,
                'message' => 'Product Saved Successfully.'
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong!'
            ], 500);
        }
    }

    public function edit($category, $id)
    {
        $data = Product::findOrFail($id);

        return response()->json([
            'status' => true,
            'data' => $data,
        ], 200);
    }

    public function update(Request $req, $category, $id)
    {
        $validation = Validator::make($req->all(), [
            'category' => 'required|string',
            'tags' => 'required',
            'title' => 'required|string|max:50',
            'slug' => 'required|string|max:50',
            'desc' => 'required|string|max:500',
            'newPrice' => 'required',
            'isNew' => 'required',
            'sizes' => 'required',
            'colors' => 'required',

            //For color 0
            'color0image0' => 'mimes:webp|max:500',
            'color0image1' => 'mimes:webp|max:500',
            'color0image2' => 'mimes:webp|max:500',
            'color0image3' => 'mimes:webp|max:500',

            //For color 1
            'color1image0' => 'mimes:webp|max:500',
            'color1image1' => 'mimes:webp|max:500',
            'color1image2' => 'mimes:webp|max:500',
            'color1image3' => 'mimes:webp|max:500',

            //For color 2
            'color2image0' => 'mimes:webp|max:500',
            'color2image1' => 'mimes:webp|max:500',
            'color2image2' => 'mimes:webp|max:500',
            'color2image3' => 'mimes:webp|max:500',

            //For color 3
            'color3image0' => 'mimes:webp|max:500',
            'color3image1' => 'mimes:webp|max:500',
            'color3image2' => 'mimes:webp|max:500',
            'color3image3' => 'mimes:webp|max:500',
        ], [
            'category.required' => 'Category is required.',
            'tags.required' => 'Tags are required.',
            'title.required' => 'Title is required.',
            'slug.required' => 'Title is required.',
            'desc.required' => 'Description is required.',
            'newPrice.required' => 'New Price is required.',
            'isNew.required' => 'Please mark new as check or uncheck.',
            'sizes.required' => 'Sizes are required.',
            'colors.required' => 'Colors are required.',

            //For color 0
            'color0image0.mimes:webp' => 'Images should be type of "webp".',
            'color0image0.max:500' => 'Images can be max 500kb.',

            'color0image1.mimes:webp' => 'Images should be type of "webp".',
            'color0image1.max:500' => 'Images can be max 500kb.',

            'color0image2.mimes:webp' => 'Images should be type of "webp".',
            'color0image2.max:500' => 'Images can be max 500kb.',

            'color0image3.mimes:webp' => 'Images should be type of "webp".',
            'color0image3.max:500' => 'Images can be max 500kb.',

            //For color 1
            'color1image0.mimes:webp' => 'Images should be type of "webp".',
            'color1image0.max:500' => 'Images can be max 500kb.',

            'color1image1.mimes:webp' => 'Images should be type of "webp".',
            'color1image1.max:500' => 'Images can be max 500kb.',

            'color1image2.mimes:webp' => 'Images should be type of "webp".',
            'color1image2.max:500' => 'Images can be max 500kb.',

            'color1image3.mimes:webp' => 'Images should be type of "webp".',
            'color1image3.max:500' => 'Images can be max 500kb.',

            //For color 2
            'color2image0.mimes:webp' => 'Images should be type of "webp".',
            'color2image0.max:500' => 'Images can be max 500kb.',

            'color2image1.mimes:webp' => 'Images should be type of "webp".',
            'color2image1.max:500' => 'Images can be max 500kb.',

            'color2image2.mimes:webp' => 'Images should be type of "webp".',
            'color2image2.max:500' => 'Images can be max 500kb.',

            'color2image3.mimes:webp' => 'Images should be type of "webp".',
            'color2image3.max:500' => 'Images can be max 500kb.',

            //For color 3
            'color3image0.mimes:webp' => 'Images should be type of "webp".',
            'color3image0.max:500' => 'Images can be max 500kb.',

            'color3image1.mimes:webp' => 'Images should be type of "webp".',
            'color3image1.max:500' => 'Images can be max 500kb.',

            'color3image2.mimes:webp' => 'Images should be type of "webp".',
            'color3image2.max:500' => 'Images can be max 500kb.',

            'color3image3.mimes:webp' => 'Images should be type of "webp".',
            'color3image3.max:500' => 'Images can be max 500kb.',

        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validation->errors()
            ], 401);
        }

        $product = Product::find($id);

        $product->isNew = $req->isNew;
        $product->category = $req->category;
        $product->tags = $req->tags;
        $product->title = $req->title;
        $product->slug = $req->slug;
        $product->desc = $req->desc;
        $product->oldPrice = $req->oldPrice;
        $product->newPrice = $req->newPrice;
        $product->sizes = $req->sizes;
        $product->colors = $req->colors;
        $colors = json_decode($req->colors);

        if (count($colors) === 3) {
            $files = [
                $product->color3image0,
                $product->color3image1,
                $product->color3image2,
                $product->color3image3,
            ];

            foreach ($files as $key => $file) {
                if ($file) {
                    $filePath = public_path('/uploads/productImages/' . $file);
                    if (file_exists($filePath)) {
                        unlink($filePath);
                    }
                }

                $prop = 'color3image' . $key;
                $product->$prop = null;
            }
        } elseif (count($colors) === 2) {
            $files = [
                $product->color2image0,
                $product->color2image1,
                $product->color2image2,
                $product->color2image3,
            ];
            foreach ($files as $key => $file) {
                if ($file) {
                    $filePath = public_path('/uploads/productImages/' . $file);
                    if (file_exists($filePath)) {
                        unlink($filePath);
                    }
                }

                $prop = 'color2image' . $key;
                $product->$prop = null;
            }
        } elseif (count($colors) === 1) {
            $files = [
                $product->color1image0,
                $product->color1image1,
                $product->color1image2,
                $product->color1image3,
            ];

            foreach ($files as $key => $file) {
                if ($file) {
                    $filePath = public_path('/uploads/productImages/' . $file);
                    if (file_exists($filePath)) {
                        unlink($filePath);
                    }
                }

                $prop = 'color1image' . $key;
                $product->$prop = null;
            }
        }



        // for color 0
        if (!empty($req->file('color0image0'))) {
            $file00 =  $req->file('color0image0');
            unlink(public_path() . '/uploads/productImages/' . $product->color0image0);
            $file00Name = time() . md5($file00->getClientOriginalName()) . '.' . $file00->getClientOriginalExtension();
            $file00->move(public_path() . '/uploads/productImages', $file00Name);

            $product->color0image0 = $file00Name;
        }
        if (!empty($req->file('color0image1'))) {
            $file01 =  $req->file('color0image1');
            unlink(public_path() . '/uploads/productImages/' . $product->color0image1);
            $file01Name = time() . md5($file01->getClientOriginalName()) . '.' . $file01->getClientOriginalExtension();
            $file01->move(public_path() . '/uploads/productImages', $file01Name);

            $product->color0image1 = $file01Name;
        }
        if (!empty($req->file('color0image2'))) {
            $file02 =  $req->file('color0image2');
            unlink(public_path() . '/uploads/productImages/' . $product->color0image2);
            $file02Name = time() . md5($file02->getClientOriginalName()) . '.' . $file02->getClientOriginalExtension();
            $file02->move(public_path() . '/uploads/productImages', $file02Name);

            $product->color0image2 = $file02Name;
        }
        if (!empty($req->file('color0image3'))) {
            $file03 =  $req->file('color0image3');
            unlink(public_path() . '/uploads/productImages/' . $product->color0image3);
            $file03Name = time() . md5($file03->getClientOriginalName()) . '.' . $file03->getClientOriginalExtension();
            $file03->move(public_path() . '/uploads/productImages', $file03Name);

            $product->color0image3 = $file03Name;
        }

        // for color 1
        if (!empty($req->file('color1image0'))) {
            $file10 =  $req->file('color1image0');
            unlink(public_path() . '/uploads/productImages/' . $product->color1image0);
            $file10Name = time() . md5($file10->getClientOriginalName()) . '.' . $file10->getClientOriginalExtension();
            $file10->move(public_path() . '/uploads/productImages', $file10Name);

            $product->color1image0 = $file10Name;
        }
        if (!empty($req->file('color1image1'))) {
            $file11 =  $req->file('color1image1');
            unlink(public_path() . '/uploads/productImages/' . $product->color1image1);
            $file11Name = time() . md5($file11->getClientOriginalName()) . '.' . $file11->getClientOriginalExtension();
            $file11->move(public_path() . '/uploads/productImages', $file11Name);

            $product->color1image1 = $file11Name;
        }
        if (!empty($req->file('color1image2'))) {
            $file12 =  $req->file('color1image2');
            unlink(public_path() . '/uploads/productImages/' . $product->color1image2);
            $file12Name = time() . md5($file12->getClientOriginalName()) . '.' . $file12->getClientOriginalExtension();
            $file12->move(public_path() . '/uploads/productImages', $file12Name);

            $product->color1image2 = $file12Name;
        }
        if (!empty($req->file('color1image3'))) {
            $file13 =  $req->file('color1image3');
            unlink(public_path() . '/uploads/productImages/' . $product->color1image3);
            $file13Name = time() . md5($file13->getClientOriginalName()) . '.' . $file13->getClientOriginalExtension();
            $file13->move(public_path() . '/uploads/productImages', $file13Name);

            $product->color1image3 = $file13Name;
        }

        // for color 2
        if (!empty($req->file('color2image0'))) {
            $file20 =  $req->file('color2image0');
            unlink(public_path() . '/uploads/productImages/' . $product->color2image0);
            $file20Name = time() . md5($file20->getClientOriginalName()) . '.' . $file20->getClientOriginalExtension();
            $file20->move(public_path() . '/uploads/productImages', $file20Name);

            $product->color2image0 = $file20Name;
        }
        if (!empty($req->file('color2image1'))) {
            $file21 =  $req->file('color2image1');
            unlink(public_path() . '/uploads/productImages/' . $product->color2image1);
            $file21Name = time() . md5($file21->getClientOriginalName()) . '.' . $file21->getClientOriginalExtension();
            $file21->move(public_path() . '/uploads/productImages', $file21Name);

            $product->color2image1 = $file21Name;
        }
        if (!empty($req->file('color2image2'))) {
            $file22 =  $req->file('color2image2');
            unlink(public_path() . '/uploads/productImages/' . $product->color2image2);
            $file22Name = time() . md5($file22->getClientOriginalName()) . '.' . $file22->getClientOriginalExtension();
            $file22->move(public_path() . '/uploads/productImages', $file22Name);

            $product->color2image2 = $file22Name;
        }
        if (!empty($req->file('color2image3'))) {
            $file23 =  $req->file('color2image3');
            unlink(public_path() . '/uploads/productImages/' . $product->color2image3);
            $file23Name = time() . md5($file23->getClientOriginalName()) . '.' . $file23->getClientOriginalExtension();
            $file23->move(public_path() . '/uploads/productImages', $file23Name);

            $product->color2image3 = $file23Name;
        }

        // for color 3
        if (!empty($req->file('color3image0'))) {
            $file30 =  $req->file('color3image0');
            unlink(public_path() . '/uploads/productImages/' . $product->color3image0);
            $file30Name = time() . md5($file30->getClientOriginalName()) . '.' . $file30->getClientOriginalExtension();
            $file30->move(public_path() . '/uploads/productImages', $file30Name);

            $product->color3image0 = $file30Name;
        }
        if (!empty($req->file('color3image1'))) {
            $file31 =  $req->file('color3image1');
            unlink(public_path() . '/uploads/productImages/' . $product->color3image1);
            $file31Name = time() . md5($file31->getClientOriginalName()) . '.' . $file31->getClientOriginalExtension();
            $file31->move(public_path() . '/uploads/productImages', $file31Name);

            $product->color3image1 = $file31Name;
        }
        if (!empty($req->file('color3image2'))) {
            $file32 =  $req->file('color3image2');
            unlink(public_path() . '/uploads/productImages/' . $product->color3image2);
            $file32Name = time() . md5($file32->getClientOriginalName()) . '.' . $file32->getClientOriginalExtension();
            $file32->move(public_path() . '/uploads/productImages', $file32Name);

            $product->color3image2 = $file32Name;
        }
        if (!empty($req->file('color3image3'))) {
            $file33 =  $req->file('color3image3');
            unlink(public_path() . '/uploads/productImages/' . $product->color3image3);
            $file33Name = time() . md5($file33->getClientOriginalName()) . '.' . $file33->getClientOriginalExtension();
            $file33->move(public_path() . '/uploads/productImages', $file33Name);

            $product->color3image3 = $file33Name;
        }

        $product->save();

        return response()->json([
            'status' => true,
            'message' => 'Product updated Successfully.'
        ], 200);
    }

    public function delete($category, Request $req)
    {
        if (empty($req->all())) {
            return response()->json([
                'isID' => false,
                'message' => 'Please Select Products!',
            ]);
        }
        foreach ($req->all() as $key => $value) {
            $product = Product::find($value);
            //For color 1
            $filesForColor1 = [
                $product->color0image0,
                $product->color0image1,
                $product->color0image2,
                $product->color0image3,
            ];
            if ($filesForColor1) {
                foreach ($filesForColor1 as $key => $file) {
                    if ($file) {
                        $filePath = public_path('/uploads/productImages/' . $file);
                        if (file_exists($filePath)) {
                            unlink($filePath);
                        }
                    }
                }
            }

            //For color 2
            $filesForColor2 = [
                $product->color1image0,
                $product->color1image1,
                $product->color1image2,
                $product->color1image3,
            ];
            if ($filesForColor2) {
                foreach ($filesForColor2 as $key => $file) {
                    if ($file) {
                        $filePath = public_path('/uploads/productImages/' . $file);
                        if (file_exists($filePath)) {
                            unlink($filePath);
                        }
                    }
                }
            }

            //For color 3
            $filesForColor3 = [
                $product->color2image0,
                $product->color2image1,
                $product->color2image2,
                $product->color2image3,
            ];
            if ($filesForColor3) {
                foreach ($filesForColor3 as $key => $file) {
                    if ($file) {
                        $filePath = public_path('/uploads/productImages/' . $file);
                        if (file_exists($filePath)) {
                            unlink($filePath);
                        }
                    }
                }
            }

            //For color 4
            $filesForColor4 = [
                $product->color3image0,
                $product->color3image1,
                $product->color3image2,
                $product->color3image3,
            ];
            if ($filesForColor4) {
                foreach ($filesForColor4 as $key => $file) {
                    if ($file) {
                        $filePath = public_path('/uploads/productImages/' . $file);
                        if (file_exists($filePath)) {
                            unlink($filePath);
                        }
                    }
                }
            }

            $product->delete();
        }


        return response()->json([
            'status' => true,
            'message' => 'Product deleted successfully.',
        ], 200);
    }



    public function getProductsForDashboards()
    {
        $allProducts = Product::select('id', 'category', 'avail', 'status')->get();

        if ($allProducts->count() <= 0) {
            return response()->json([
                "status" => false,
                'message' => 'No products found!'
            ], 200);
        }
        return response()->json([
            "status" => true,
            "products" => $allProducts
        ], 200);
    }

    public function getAllProducts(Request $request, $category)
    {
        $perPage = $request->query('perPage');
        $allProducts = Product::where('category', $category)->paginate($perPage);

        if ($allProducts->count() <= 0) {
            return response()->json([
                "status" => false,
                'message' => 'No products found!'
            ], 200);
        }
        return response()->json([
            "status" => true,
            "products" => $allProducts->items(),
            "pagination" => [
                "current_page" => $allProducts->currentPage(),
                "last_page" => $allProducts->lastPage(),
                "total" => $allProducts->total(),
                "per_page" => $allProducts->perPage()
            ]
        ], 200);
    }

    public function getAllEnabledProducts(Request $request, $category)
    {
        $perPage = $request->query('perPage');
        $enabledProducts = Product::where('category', $category)->where('status', 'true')->paginate($perPage);

        if ($enabledProducts->count() <= 0) {
            return response()->json([
                "status" => false,
                'message' => 'No products found!'
            ], 200);
        }
        return response()->json([
            "status" => true,
            "products" => $enabledProducts->items(),
            "pagination" => [
                "current_page" => $enabledProducts->currentPage(),
                "last_page" => $enabledProducts->lastPage(),
                "total" => $enabledProducts->total(),
                "per_page" => $enabledProducts->perPage()
            ]
        ], 200);
    }

    public function getSingleProduct($category, $id)
    {
        $singleProduct = Product::where('id', $id)->where('category', $category)->where('status', 'true')->first();
        return response()->json([
            'status' => true,
            'singleProduct' => $singleProduct
        ], 200);
    }

    public function getAllDisabledProducts(Request $request, $category)
    {
        $perPage = $request->query('perPage');
        $allDisabledProducts = Product::where('category', $category)->where('status', 'false')->paginate($perPage);

        if ($allDisabledProducts->isEmpty()) {
            return response()->json([
                "status" => false,
                'message' => 'No products found!'
            ], 200);
        }

        return response()->json([
            "status" => true,
            "products" => $allDisabledProducts->items(),
            "pagination" => [
                "current_page" => $allDisabledProducts->currentPage(),
                "last_page" => $allDisabledProducts->lastPage(),
                "total" => $allDisabledProducts->total(),
                "per_page" => $allDisabledProducts->perPage()
            ]
        ], 200);
    }

    public function getInStockProducts(Request $request, $category)
    {

        $perPage = $request->query('perPage');
        $instockProducts = Product::where('category', $category)->where('avail', 'true')->where('status', 'true')->paginate($perPage);

        if ($instockProducts->isEmpty()) {
            return response()->json([
                "status" => false,
                'message' => 'No products found!'
            ], 200);
        }
        return response()->json([
            "status" => true,
            "products" => $instockProducts->items(),
            "pagination" => [
                "current_page" => $instockProducts->currentPage(),
                "last_page" => $instockProducts->lastPage(),
                "total" => $instockProducts->total(),
                "per_page" => $instockProducts->perPage()
            ]
        ], 200);
    }

    public function getOutStockProducts(Request $request, $category)
    {
        $perPage = $request->query('perPage');
        $outstockProducts = Product::where('category', $category)->where('avail', 'false')->where('status', 'true')->paginate($perPage);

        if ($outstockProducts->isEmpty()) {
            return response()->json([
                "status" => false,
                'message' => 'No products found!'
            ], 200);
        }
        return response()->json([
            "status" => true,
            "products" => $outstockProducts->items(),
            "pagination" => [
                "current_page" => $outstockProducts->currentPage(),
                "last_page" => $outstockProducts->lastPage(),
                "total" => $outstockProducts->total(),
                "per_page" => $outstockProducts->perPage()
            ]
        ], 200);
    }

    public function getSearchedProducts(Request $request, $category)
    {
        $perPage = $request->query('perPage');
        $query = $request->query('query');
        $searchedProducts = Product::where('category', $category)->where('title', 'LIKE', $query)->orWhere('newPrice', 'LIKE', $query)->paginate($perPage);

        if ($searchedProducts->isEmpty()) {
            return response()->json([
                "status" => false,
                'message' => 'No products found!'
            ], 200);
        }
        return response()->json([
            "status" => true,
            "products" => $searchedProducts->items(),
            "pagination" => [
                "current_page" => $searchedProducts->currentPage(),
                "last_page" => $searchedProducts->lastPage(),
                "total" => $searchedProducts->total(),
                "per_page" => $searchedProducts->perPage()
            ]
        ], 200);
    }

    public function changeStock($category, $id)
    {
        $product = Product::where('category', $category)->where('id', $id)->where('status', 'true')->first();

        if ($product->avail === 'true') {
            $product->avail = 'false';
        } else {
            $product->avail = 'true';
        }

        $product->save();

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Product Not Found!'
            ], 200);
        } else {
            return response()->json([
                'status' => true,
                'message' => 'Product Stock Changed Successfully.'
            ], 200);
        }
    }

    public function changeStatus($category, $id)
    {
        $product = Product::where('category', $category)->where('id', $id)->first();

        if ($product->status === 'true') {
            $product->status = 'false';
        } else {
            $product->status = 'true';
        }

        $product->save();

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Product Not Found!'
            ], 200);
        } else {
            return response()->json([
                'status' => true,
                'message' => 'Product Status Changed Successfully.'
            ], 200);
        }
    }
}
