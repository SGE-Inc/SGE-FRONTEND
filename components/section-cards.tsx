import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardData = {
  description: string;
  value: string;
  trendIcon: React.ComponentType<{ className?: string }>;
  trendPercent: string;
  footerMainText: string;
  footerMainIcon: React.ComponentType<{ className?: string }>;
  footerSubText: string;
};

export function SectionCards() {
  const cardsData: CardData[] = [
    {
      description: "Total Revenue",
      value: "$1,250.00",
      trendIcon: IconTrendingUp,
      trendPercent: "+12.5%",
      footerMainText: "Trending up this month",
      footerMainIcon: IconTrendingUp,
      footerSubText: "Visitors for the last 6 months",
    },
    {
      description: "New Customers",
      value: "1,234",
      trendIcon: IconTrendingDown,
      trendPercent: "-20%",
      footerMainText: "Down 20% this period",
      footerMainIcon: IconTrendingDown,
      footerSubText: "Acquisition needs attention",
    },
    {
      description: "Active Accounts",
      value: "45,678",
      trendIcon: IconTrendingUp,
      trendPercent: "+12.5%",
      footerMainText: "Strong user retention",
      footerMainIcon: IconTrendingUp,
      footerSubText: "Engagement exceed targets",
    },
    {
      description: "Growth Rate",
      value: "4.5%",
      trendIcon: IconTrendingUp,
      trendPercent: "+4.5%",
      footerMainText: "Steady performance increase",
      footerMainIcon: IconTrendingUp,
      footerSubText: "Meets growth projections",
    },
  ];

  return (
    // section-cards.tsx
    <div className="grid grid-cols-1 auto-rows-min gap-4 @md:grid-cols-2 @lg:grid-cols-4">
      {cardsData.map((card, index) => {
        const TrendIcon = card.trendIcon;
        const FooterIcon = card.footerMainIcon;

        return (
          <Card key={index} className="@container/card">
            <CardHeader>
              <CardDescription>{card.description}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {card.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendIcon className="size-4" />
                  {card.trendPercent}
                </Badge>
              </CardAction>
            </CardHeader>

            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {card.footerMainText} <FooterIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">{card.footerSubText}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
