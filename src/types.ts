export interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {};
}

export interface Review {
  type: string;
  id: string;
  attributes: {
    created: string;
    modified: string;
    price: string | null;
    includesMaterials: boolean;
    materialsCost: null;
    weighedRating: boolean;
    comment: string | null;
    rating: string;
    jobId?: number;
    sellerDisplayName: string;
  };
  relationships: {
    buyer: {
      data: {
        type: string;
        id: string;
      };
    };
  };
}

export interface User {
  type: string;
  id: string;
  attributes: {
    firstName: string;
    lastName: string;
    sellerDisplayName: string;
  };
}

export interface ReviewsResponse {
  data: Review[];
  included: User[];
  meta: {
    pagination: {
      page: number;
      pages: number;
      count: number;
    };
    positiveAmount: number;
    negativeAmount: number;
  };
}

export type ReviewsData = ReviewsResponse[];
