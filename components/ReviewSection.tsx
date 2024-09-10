import React from "react";
import { IReview } from "@/types/review.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const ReviewSection: React.FC<{ reviews: IReview[] }> = ({ reviews }) => {
  return (
    <Card className="sticky top-4 shadow-lg">
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        {reviews.length > 0 ? (
          <div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto pr-4">
            {reviews.map((review) => (
              <div key={review.reviewerEmail} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{review.reviewerName}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4  ${i < Number(review.rating) ? 'fill-current ' : ''}`} />
                    ))}
                  </div>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="italic">No reviews yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewSection;