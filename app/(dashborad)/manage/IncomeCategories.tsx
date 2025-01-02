import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { TrendingUp } from "lucide-react";
import type { Category } from "@prisma/client";
import CreateCategory from "./CreateCategory";
import RemoveCategory from "./RemoveCategory";

function IncomeCategoryList() {
	const categoriesQuery = useQuery({
		queryKey: ["categories", "income"],
		queryFn: () =>
			fetch("/api/categories?type=income").then((res) => res.json()),
	});

	return (
		<SkeletonWrapper isLoading={categoriesQuery.isLoading}>
			<Card>
				<CardHeader>
					<CardTitle>
						<div className="flex items-center gap-2">
							<TrendingUp className="h-12 w-12 rounded-lg bg-emerald-400/10 p-2 text-emerald-500" />
							Income Categories
						</div>
					</CardTitle>
				</CardHeader>
				{/* Pass onSuccess to CreateCategory */}
				<div>
					<CreateCategory
						type="income"
						successCallback={() => categoriesQuery.refetch()}
						onSuccess={() => categoriesQuery.refetch()}
					/>
					{categoriesQuery.data && categoriesQuery.data.length > 0 ? (
						categoriesQuery.data.map((category: Category) => (
							<div
								key={category.name}
								className="flex items-center justify-between p-2"
							>
								<div>{category.name}</div>
								<RemoveCategory category={category} />
							</div>
						))
					) : (
						<p>No categories available.</p>
					)}
				</div>
			</Card>
		</SkeletonWrapper>
	);
}

export default IncomeCategoryList;
