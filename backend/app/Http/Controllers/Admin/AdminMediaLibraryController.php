<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaLibrary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminMediaLibraryController extends Controller
{
    public function addMediaLibrary(Request $req)
    {
        // return $req;

        $validation = Validator::make($req->all(), [
            'heroLImg' => 'mimes:webp|max:500',
            'heroCImg' => 'mimes:webp|max:500',
            'heroRImg' => 'mimes:webp|max:500',

            'heroCatShirtImg' => 'mimes:webp|max:500',
            'heroCatPantImg' => 'mimes:webp|max:500',
            'heroCatHoodieImg' => 'mimes:webp|max:500',
            'heroCatJacketImg' => 'mimes:webp|max:500',
            'heroCatShoesImg' => 'mimes:webp|max:500',

            'bottomCatShirtImg' => 'mimes:webp|max:500',
            'bottomCatPantImg' => 'mimes:webp|max:500',
            'bottomCatHoodieImg' => 'mimes:webp|max:500',
            'bottomCatJacketImg' => 'mimes:webp|max:500',
            'bottomCatShoesImg' => 'mimes:webp|max:500',

            'searchCatShirtImg' => 'mimes:webp|max:500',
            'searchCatPantImg' => 'mimes:webp|max:500',
            'searchCatHoodieImg' => 'mimes:webp|max:500',
            'searchCatJacketImg' => 'mimes:webp|max:500',
            'searchCatShoesImg' => 'mimes:webp|max:500',
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validation->messages()
            ], 401);
        }

        // 1. Define all your expected file fields in a simple array
        $fileFields = [
            'heroLImg',
            'heroCImg',
            'heroRImg',
            'heroCatShirtImg',
            'heroCatPantImg',
            'heroCatHoodieImg',
            'heroCatJacketImg',
            'heroCatShoesImg',
            'bottomCatShirtImg',
            'bottomCatPantImg',
            'bottomCatHoodieImg',
            'bottomCatJacketImg',
            'bottomCatShoesImg',
            'searchCatShirtImg',
            'searchCatPantImg',
            'searchCatHoodieImg',
            'searchCatJacketImg',
            'searchCatShoesImg'
        ];

        $mediaLibrary = MediaLibrary::first();
        $hasNewUploads = false;
        $uploadedData = [];

        foreach ($fileFields as $field) {
            if ($req->hasFile($field)) {
                $file = $req->file($field);

                if ($mediaLibrary && !empty($mediaLibrary->$field)) {
                    $oldFilePath = public_path('uploads/mediaLibrary/' . $mediaLibrary->$field);

                    if (file_exists($oldFilePath)) {
                        @unlink($oldFilePath);
                    }
                }

                $fileName = time() . md5($file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();

                $file->move(public_path('uploads/mediaLibrary'), $fileName);

                $uploadedData[$field] = $fileName;
                $hasNewUploads = true;
            }
        }

        $images = null;

        if ($mediaLibrary) {
            if ($hasNewUploads) {
                $images = $mediaLibrary->update($uploadedData);
            } else {
                $images = true;
            }
        } else {
            $images = MediaLibrary::create($uploadedData);
        }

        if ($images !== null) {
            return response()->json([
                'status' => true,
                'message' => 'Images saved successfully'
            ], 200);
        }

        return response()->json([
            'status' => false,
            'message' => 'something went wrong'
        ], 200);
    }
}
