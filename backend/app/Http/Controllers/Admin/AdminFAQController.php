<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FAQ;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminFAQController extends Controller
{
    public function getAllFaq()
    {
        $allFAQs = FAQ::get();

        if ($allFAQs->count() < 0) {
            return response()->json([
                'status' => false
            ], 200);
        }
        return response()->json([
            'status' => true,
            'allFAQs' => $allFAQs,
        ], 200);
    }

    public function addFaq(Request $req)
    {
        $validation = Validator::make($req->all(), [
            'question' => 'string|required|max:150',
            'answer' => 'string|required|max:650'
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validation->messages()
            ], 200);
        }

        $faq = FAQ::where('question', $req->question)->where('answer', $req->answer)->first();

        if (!$faq) {
            FAQ::create([
                'question' => $req->question,
                'answer' => $req->answer
            ]);
        } else {
            return response()->json([
                'status' => 'alreadyExist',
                'message' => 'FAQ already exist!'
            ], 200);
        }

        return response()->json([
            'status' => true,
            'message' => 'FAQ Added Successfully'
        ], 200);
    }

    public function editFaq($id)
    {
        $faq = FAQ::find($id);

        if (!$faq) {
            return response()->json([
                'status' => false,
                'message' => 'FAQ Not Found'
            ], 200);
        }

        return response()->json([
            'status' => true,
            'faq' => $faq
        ], 200);
    }

    public function updateFaq(Request $req, $id)
    {
        $validation = Validator::make($req->all(), [
            'question' => 'string|required|max:150',
            'answer' => 'string|required|max:650'
        ]);

        if ($validation->fails()) {
            return response()->json([
                'status' => false,
                "message" => $validation->messages()
            ], 200);
        }

        $faq = FAQ::find($id);

        if (!$faq) {
            return response()->json([
                'status' => 'notFound',
                'message' => 'FAQ Not Found'
            ], 200);
        }

        $faq->question = $req->question;
        $faq->answer = $req->answer;
        $faq->save();

        return response()->json([
            'status' => true,
            'message' => 'FAQ Updated Successfully'
        ], 200);
    }

    public function deleteFaq($id)
    {
        $faq = FAQ::find($id);

        if (!$faq) {
            return response()->json([
                'status' => false,
                'message' => 'FAQ Not Found'
            ], 200);
        }
        $faq->delete();
        return response()->json([
            'status' => true,
            'message' => 'FAQ Deleted Successfully'
        ], 200);
    }
}
