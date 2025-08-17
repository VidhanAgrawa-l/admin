import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Users,
  Clock,
  Filter,
  ChevronDown,
  ChevronUp,
  RefreshCcw,
  X,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";

// Define TypeScript interfaces for API responses
interface BidMetrics {
  total_bids: number;
  fulfilled_bids: number;
  avg_fulfill_time_days: number;
}

interface ChatDealCounts {
  total_chat_initialize: number;
  total_deal_final: number;
}

interface ProfileAging {
  average_profile_aging_days: number;
}

interface Counts {
  recruiters_count: number;
  candidates_count: number;
}

interface PriceSummary {
  [key: string]: number;
}

interface TimeSeriesDataPoint {
  period: string;
  count: number;
  timestamp: number;
}

interface TimeSeriesResponse {
  filters: {
    time_range: string;
    frequency?: string;
    start_date?: string;
    end_date?: string;
  };
  data_points: number;
  total_candidates: number;
  data: TimeSeriesDataPoint[];
}

interface FilterOptions {
  roles: string[];
  locations: string[];
  city?: string[];
  experience_range: {
    min: number;
    max: number;
  };
  ctc_range: {
    min: number;
    max: number;
  };
}

interface TimeSeriesFilters {
  time_range: string;
  frequency?: string;
  start_date?: string;
  end_date?: string;
  roles?: string[];
  locations?: string[];
  min_experience?: number;
  max_experience?: number;
  min_ctc?: number;
  max_ctc?: number;
  sold?: boolean;
}

const AdminDashboard: React.FC = () => {
  // State for all API data
  const [bidMetrics, setBidMetrics] = useState<BidMetrics | null>(null);
  const [chatDealCounts, setChatDealCounts] = useState<ChatDealCounts | null>(
    null
  );
  const [profileAging, setProfileAging] = useState<ProfileAging | null>(null);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [priceSummary, setPriceSummary] = useState<PriceSummary | null>(null);
  const [timeSeriesData, setTimeSeriesData] =
    useState<TimeSeriesResponse | null>(null);
  const [transactionTimeSeriesData, setTransactionTimeSeriesData] =
    useState<TimeSeriesResponse | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(
    null
  );

  // Default filters state
  const defaultTimeSeriesFilters: TimeSeriesFilters = {
    time_range: "3m",
    frequency: "daily",
    sold: undefined,
  };

  // Loading states
  const [loadingMetrics, setLoadingMetrics] = useState<boolean>(true);
  const [loadingTimeSeries, setLoadingTimeSeries] = useState<boolean>(true);
  const [loadingTransactionTimeSeries, setLoadingTransactionTimeSeries] =
    useState<boolean>(true);
  const [loadingFilterOptions, setLoadingFilterOptions] =
    useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Error states
  const [errorMetrics, setErrorMetrics] = useState<string | null>(null);
  const [errorTimeSeries, setErrorTimeSeries] = useState<string | null>(null);
  const [errorTransactionTimeSeries, setErrorTransactionTimeSeries] = useState<
    string | null
  >(null);

  // Time series filter state
  const [timeSeriesFilters, setTimeSeriesFilters] = useState<TimeSeriesFilters>(
    defaultTimeSeriesFilters
  );
  const [transactionTimeSeriesFilters, setTransactionTimeSeriesFilters] =
    useState<TimeSeriesFilters>({
      time_range: "3m",
      frequency: "daily",
    });

  // Advanced filters open state
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

  // Fetch dashboard metrics data
  const fetchMetricsData = async () => {
    try {
      setLoadingMetrics(true);

      // Fetch data from all metrics APIs
      const bidResponse = await fetch(
        "https://dashboard-biding-metric-1052532391820.europe-west1.run.app/bids/metrics"
      );
      const chatDealResponse = await fetch(
        "https://dashboard-chat-vs-deal-count-1052532391820.europe-west1.run.app/chat-deal-counts"
      );
      const profileAgingResponse = await fetch(
        "https://dashboard-profile-aging-1052532391820.europe-west1.run.app/average_profile_aging"
      );
      const countsResponse = await fetch(
        "https://dashboard-total-count-1052532391820.europe-west1.run.app/counts"
      );
      const priceSummaryResponse = await fetch(
        "https://dashboard-five-point-summary-1052532391820.europe-west1.run.app/price-summary"
      );

      // Check if all responses are successful
      if (
        !bidResponse.ok ||
        !chatDealResponse.ok ||
        !profileAgingResponse.ok ||
        !countsResponse.ok ||
        !priceSummaryResponse.ok
      ) {
        throw new Error("One or more API requests failed");
      }

      // Parse JSON responses
      const bidData: BidMetrics = await bidResponse.json();
      const chatDealData: ChatDealCounts = await chatDealResponse.json();
      const profileAgingData: ProfileAging = await profileAgingResponse.json();
      const countsData: Counts = await countsResponse.json();
      const priceSummaryData: PriceSummary = await priceSummaryResponse.json();

      // Update state with fetched data
      setBidMetrics(bidData);
      setChatDealCounts(chatDealData);
      setProfileAging(profileAgingData);
      setCounts(countsData);
      setPriceSummary(priceSummaryData);
    } catch (err) {
      setErrorMetrics(
        "Failed to fetch dashboard metrics. Please try again later."
      );
      console.error("Error fetching metrics data:", err);
    } finally {
      setLoadingMetrics(false);
    }
  };

  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      setLoadingFilterOptions(true);
      const response = await fetch(
        "https://dashboard-candidates-timeseries-1052532391820.europe-west1.run.app/candidates/filter-options"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch filter options");
      }

      const data: FilterOptions = await response.json();
      setFilterOptions(data);
    } catch (err) {
      console.error("Error fetching filter options:", err);
    } finally {
      setLoadingFilterOptions(false);
    }
  };

  // Fetch time series data
  const fetchTimeSeriesData = async () => {
    try {
      setLoadingTimeSeries(true);
      setErrorTimeSeries(null);

      // Build query parameters
      const params = new URLSearchParams();
      Object.entries(timeSeriesFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((val) => params.append(key, val));
          } else {
            params.append(key, String(value));
          }
        }
      });

      const queryString = params.toString();
      const url = `https://dashboard-candidates-timeseries-1052532391820.europe-west1.run.app/candidates/time-series?${queryString}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch time series data");
      }

      const responseData: TimeSeriesResponse = await response.json();
      setTimeSeriesData(responseData);
    } catch (err) {
      setErrorTimeSeries(
        "Failed to fetch time series data. Please try again later."
      );
      console.error("Error fetching time series data:", err);
    } finally {
      setLoadingTimeSeries(false);
      setIsRefreshing(false);
    }
  };

  const fetchTransactionSeriesData = async () => {
    try {
      setLoadingTransactionTimeSeries(true);
      setErrorTransactionTimeSeries(null);

      // Build query parameters
      const params = new URLSearchParams();
      Object.entries(transactionTimeSeriesFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((val) => params.append(key, val));
          } else {
            params.append(key, String(value));
          }
        }
      });

      const queryString = params.toString();
      const url = `https://dashboard-transaction-count-1052532391820.europe-west1.run.app/transactions/time-series?${queryString}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch transaction time series data");
      }

      const responseData: TimeSeriesResponse = await response.json();
      setTransactionTimeSeriesData(responseData);
    } catch (err) {
      setErrorTransactionTimeSeries(
        "Failed to fetch transaction time series data. Please try again later."
      );
      console.error("Error fetching transaction time series data:", err);
    } finally {
      setLoadingTransactionTimeSeries(false);
      setIsRefreshing(false);
    }
  };

  // Initial data fetching
  useEffect(() => {
    fetchMetricsData();
    fetchFilterOptions();
    fetchTimeSeriesData();
    fetchTransactionSeriesData();
  }, []);

  // Fetch time series data when filters change
  useEffect(() => {
    // Only fetch if we have enough data for custom range
    if (timeSeriesFilters.time_range === "custom") {
      if (timeSeriesFilters.start_date && timeSeriesFilters.end_date) {
        fetchTimeSeriesData();
      }
    } else {
      fetchTimeSeriesData();
    }
  }, [timeSeriesFilters]);

  // Fetch transaction time series data when filters change
  useEffect(() => {
    if (transactionTimeSeriesFilters.time_range === "custom") {
      if (
        transactionTimeSeriesFilters.start_date &&
        transactionTimeSeriesFilters.end_date
      ) {
        fetchTransactionSeriesData();
      }
    } else {
      fetchTransactionSeriesData();
    }
  }, [transactionTimeSeriesFilters]);

  // Handle refresh button click
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchMetricsData();
    fetchTimeSeriesData();
    fetchTransactionSeriesData();
  };

  // Handle clear filters button click
  const handleClearFilters = () => {
    setTimeSeriesFilters(defaultTimeSeriesFilters);
    setIsAdvancedFiltersOpen(false);
  };

  // Handle time range change for candidate time series
  const handleTimeRangeChange = (value: string) => {
    // Reset custom date fields if not custom
    if (value !== "custom") {
      setTimeSeriesFilters({
        ...timeSeriesFilters,
        time_range: value,
        start_date: undefined,
        end_date: undefined,
      });
    } else {
      setTimeSeriesFilters({
        ...timeSeriesFilters,
        time_range: value,
      });
    }
  };

  // Handle time range change for transaction time series
  const handleTransactionTimeRangeChange = (value: string) => {
    if (value !== "custom") {
      setTransactionTimeSeriesFilters({
        ...transactionTimeSeriesFilters,
        time_range: value,
        start_date: undefined,
        end_date: undefined,
      });
    } else {
      setTransactionTimeSeriesFilters({
        ...transactionTimeSeriesFilters,
        time_range: value,
      });
    }
  };

  // Handle filter change for candidate time series
  const handleFilterChange = (
    name: keyof TimeSeriesFilters,
    value: string | string[] | number | boolean
  ) => {
    setTimeSeriesFilters({
      ...timeSeriesFilters,
      [name]: value,
    });
  };

  // Handle frequency change for transaction time series
  const handleTransactionFrequencyChange = (value: string) => {
    setTransactionTimeSeriesFilters({
      ...transactionTimeSeriesFilters,
      frequency: value,
    });
  };

  // Handle date input change with immediate data fetch when both dates are set
  const handleDateChange = (name: "start_date" | "end_date", value: string) => {
    const updatedFilters = {
      ...timeSeriesFilters,
      [name]: value,
    };

    setTimeSeriesFilters(updatedFilters);
  };

  // Handle transaction date input change
  const handleTransactionDateChange = (
    name: "start_date" | "end_date",
    value: string
  ) => {
    const updatedFilters = {
      ...transactionTimeSeriesFilters,
      [name]: value,
    };

    setTransactionTimeSeriesFilters(updatedFilters);
  };

  // Prepare chart data for Chat vs Deals
  const chatDealChartData = chatDealCounts
    ? [
        {
          name: "Chat Initialized",
          value: chatDealCounts.total_chat_initialize,
        },
        { name: "Deals Closed", value: chatDealCounts.total_deal_final },
      ]
    : [];

  // Prepare chart data for bid fulfillment
  const bidChartData = bidMetrics
    ? [
        { name: "Total Bids", value: bidMetrics.total_bids },
        { name: "Fulfilled Bids", value: bidMetrics.fulfilled_bids },
      ]
    : [];

  // Calculate conversion rate
  const conversionRate = chatDealCounts
    ? (
        (chatDealCounts.total_deal_final /
          chatDealCounts.total_chat_initialize) *
        100
      ).toFixed(1)
    : "0";

  // Calculate fulfillment rate
  const fulfillmentRate = bidMetrics
    ? ((bidMetrics.fulfilled_bids / bidMetrics.total_bids) * 100).toFixed(1)
    : "0";

  // Card data for summary
  const summaryCards = [
    {
      title: "Recruiters",
      value: counts?.recruiters_count || 0,
      icon: Users,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Candidates",
      value: counts?.candidates_count || 0,
      icon: Users,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Avg Profile Age",
      value: profileAging?.average_profile_aging_days?.toFixed(1) || 0,
      unit: "days",
      icon: Clock,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Avg Fulfillment",
      value: bidMetrics?.avg_fulfill_time_days?.toFixed(1) || 0,
      unit: "days",
      icon: Clock,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Conversion Rate",
      value: conversionRate,
      unit: "%",
      icon: ArrowUpRight,
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  // Check if any filters are active
  const hasActiveFilters = () => {
    // For custom time range, check if dates are set
    if (timeSeriesFilters.time_range === "custom") {
      if (!timeSeriesFilters.start_date || !timeSeriesFilters.end_date) {
        return false;
      }
    }

    if (timeSeriesFilters.time_range !== defaultTimeSeriesFilters.time_range)
      return true;
    if (timeSeriesFilters.frequency !== defaultTimeSeriesFilters.frequency)
      return true;
    if (timeSeriesFilters.sold !== defaultTimeSeriesFilters.sold) return true;
    if (timeSeriesFilters.roles && timeSeriesFilters.roles.length > 0)
      return true;
    if (timeSeriesFilters.locations && timeSeriesFilters.locations.length > 0)
      return true;
    if (timeSeriesFilters.min_experience !== undefined) return true;
    if (timeSeriesFilters.max_experience !== undefined) return true;
    if (timeSeriesFilters.min_ctc !== undefined) return true;
    if (timeSeriesFilters.max_ctc !== undefined) return true;
    return false;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with Refresh Button */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Platform Analytics
            </h1>
            <p className="text-muted-foreground">
              View and analyze your recruitment metrics
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCcw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </Button>
        </div>

        {/* Summary Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {summaryCards.map((card, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                {loadingMetrics ? (
                  <CardSkeleton />
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {card.title}
                      </p>
                      <p className="text-2xl font-bold">
                        {card.value} {card.unit && card.unit}
                      </p>
                    </div>
                    <div className={`${card.bgColor} p-2 rounded-full`}>
                      <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Bid Metrics Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Bid Fulfillment</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingMetrics ? (
                <ChartSkeleton />
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Bids
                      </p>
                      <p className="text-xl font-bold">
                        {bidMetrics?.total_bids || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Fulfilled Bids
                      </p>
                      <p className="text-xl font-bold">
                        {bidMetrics?.fulfilled_bids || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Fulfillment Rate
                      </p>
                      <p className="text-xl font-bold">{fulfillmentRate}%</p>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={bidChartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="stroke-muted"
                        />
                        <XAxis dataKey="name" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                          }}
                        />
                        <Bar
                          dataKey="value"
                          fill="hsl(var(--primary))"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Chat vs Deal Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Chat Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingMetrics ? (
                <ChartSkeleton />
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Chats
                      </p>
                      <p className="text-xl font-bold">
                        {chatDealCounts?.total_chat_initialize || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Deals Closed
                      </p>
                      <p className="text-xl font-bold">
                        {chatDealCounts?.total_deal_final || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Conversion Rate
                      </p>
                      <p className="text-xl font-bold">{conversionRate}%</p>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chatDealChartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="stroke-muted"
                        />
                        <XAxis dataKey="name" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                          }}
                        />
                        <Bar
                          dataKey="value"
                          fill="hsl(var(--primary))"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Time Series Chart Section */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <CardTitle>Candidate Time Series</CardTitle>
                <CardDescription>
                  Track candidate activity over time
                </CardDescription>
              </div>

              {/* Filter Controls Row */}
              <div className="flex flex-wrap gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Time Range
                  </label>
                  <Select
                    value={timeSeriesFilters.time_range}
                    onValueChange={handleTimeRangeChange}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1d">1 Day</SelectItem>
                      <SelectItem value="7d">7 Day</SelectItem>
                      <SelectItem value="1m">1 Month</SelectItem>
                      <SelectItem value="3m">3 Months</SelectItem>
                      <SelectItem value="6m">6 Month</SelectItem>
                      <SelectItem value="1y">1 Year</SelectItem>
                      <SelectItem value="2y">2 Year</SelectItem>
                      <SelectItem value="5y">5 Year</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {timeSeriesFilters.time_range === "custom" && (
                  <>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        Start Date
                      </label>
                      <Input
                        type="date"
                        value={timeSeriesFilters.start_date || ""}
                        onChange={(e) =>
                          handleDateChange("start_date", e.target.value)
                        }
                        className="w-[150px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        End Date
                      </label>
                      <Input
                        type="date"
                        value={timeSeriesFilters.end_date || ""}
                        onChange={(e) =>
                          handleDateChange("end_date", e.target.value)
                        }
                        className="w-[150px]"
                      />
                    </div>
                    {timeSeriesFilters.start_date &&
                      timeSeriesFilters.end_date && (
                        <div className="space-y-1">
                          <label className="text-sm font-medium text-muted-foreground">
                            &nbsp;
                          </label>
                          <Button
                            variant="default"
                            className="mt-auto"
                            onClick={fetchTimeSeriesData}
                            disabled={loadingTimeSeries}
                          >
                            Apply Dates
                          </Button>
                        </div>
                      )}
                  </>
                )}

                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Frequency
                  </label>
                  <Select
                    value={timeSeriesFilters.frequency || "daily"}
                    onValueChange={(value) =>
                      handleFilterChange("frequency", value)
                    }
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Sold Status
                  </label>
                  <Select
                    value={
                      timeSeriesFilters.sold !== undefined
                        ? String(timeSeriesFilters.sold)
                        : "undefined"
                    }
                    onValueChange={(value) =>
                      handleFilterChange(
                        "sold",
                        value === "undefined" ? undefined : value === "true"
                      )
                    }
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="undefined">All</SelectItem>
                      <SelectItem value="true">Sold</SelectItem>
                      <SelectItem value="false">Not Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end gap-2">
                  <Button
                    variant="outline"
                    className="mt-auto"
                    onClick={() =>
                      setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)
                    }
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                    {isAdvancedFiltersOpen ? (
                      <ChevronUp className="h-4 w-4 ml-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-2" />
                    )}
                  </Button>

                  {hasActiveFilters() && (
                    <Button
                      variant="outline"
                      className="mt-auto text-destructive hover:text-destructive"
                      onClick={handleClearFilters}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Advanced Filters Section */}
            <Collapsible open={isAdvancedFiltersOpen}>
              <CollapsibleContent className="space-y-4 mb-6 p-4 border rounded-lg bg-muted/20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Roles Filter */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      Roles
                    </label>
                    <Select
                      multiple
                      value={timeSeriesFilters.roles || []}
                      onValueChange={(values) =>
                        handleFilterChange("roles", values)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select roles" />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions?.roles?.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Locations Filter */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      Locations
                    </label>
                    <Select
                      multiple
                      value={timeSeriesFilters.locations || []}
                      onValueChange={(values) =>
                        handleFilterChange("locations", values)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select locations" />
                      </SelectTrigger>
                      <SelectContent>
                        {(filterOptions?.city || filterOptions?.locations)?.map(
                          (location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Experience Range */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      Experience (years)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={timeSeriesFilters.min_experience || ""}
                        onChange={(e) =>
                          handleFilterChange(
                            "min_experience",
                            Number(e.target.value)
                          )
                        }
                        min={filterOptions?.experience_range.min}
                        max={filterOptions?.experience_range.max}
                      />
                      <span className="self-center text-muted-foreground">
                        to
                      </span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={timeSeriesFilters.max_experience || ""}
                        onChange={(e) =>
                          handleFilterChange(
                            "max_experience",
                            Number(e.target.value)
                          )
                        }
                        min={filterOptions?.experience_range.min}
                        max={filterOptions?.experience_range.max}
                      />
                    </div>
                  </div>

                  {/* CTC Range */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      CTC Range
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={timeSeriesFilters.min_ctc || ""}
                        onChange={(e) =>
                          handleFilterChange("min_ctc", Number(e.target.value))
                        }
                        min={filterOptions?.ctc_range.min}
                        max={filterOptions?.ctc_range.max}
                      />
                      <span className="self-center text-muted-foreground">
                        to
                      </span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={timeSeriesFilters.max_ctc || ""}
                        onChange={(e) =>
                          handleFilterChange("max_ctc", Number(e.target.value))
                        }
                        min={filterOptions?.ctc_range.min}
                        max={filterOptions?.ctc_range.max}
                      />
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {loadingTimeSeries ? (
              <ChartSkeleton />
            ) : errorTimeSeries ? (
              <div className="text-destructive p-4 text-center">
                {errorTimeSeries}
              </div>
            ) : timeSeriesData ? (
              <div className="space-y-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={timeSeriesData.data}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis
                        dataKey="period"
                        tickFormatter={(value) => {
                          return value
                            .split(" to ")[0]
                            .split("-")
                            .slice(1)
                            .join("/");
                        }}
                        className="text-xs"
                      />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                        labelFormatter={(label) => `Period: ${label}`}
                        formatter={(value) => [`${value} candidates`, "Count"]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        name="Candidate Count"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="px-4 py-1.5">
                    <span className="font-medium">Total Candidates:</span>{" "}
                    {timeSeriesData.total_candidates}
                  </Badge>
                  <Badge variant="outline" className="px-4 py-1.5">
                    <span className="font-medium">Data Points:</span>{" "}
                    {timeSeriesData.data_points}
                  </Badge>
                  <Badge variant="outline" className="px-4 py-1.5">
                    <span className="font-medium">Time Range:</span>{" "}
                    {timeSeriesData.filters.start_date} to{" "}
                    {timeSeriesData.filters.end_date}
                  </Badge>
                  <Badge variant="outline" className="px-4 py-1.5">
                    <span className="font-medium">Frequency:</span>{" "}
                    {timeSeriesData.filters.frequency || "Daily"}
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                No time series data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Price Summary</CardTitle>
            <CardDescription>
              Candidate profile pricing metrics overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingMetrics ? (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : priceSummary ? (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(priceSummary).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <p className="text-sm text-muted-foreground">
                      {key.replace(/_/g, " ").toUpperCase()}
                    </p>
                    <p className="text-xl font-bold">
                      {typeof value === "number" ? value.toFixed(2) : value} C
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                No price summary data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <CardTitle>Transactions Time Series</CardTitle>
                <CardDescription>
                  Track transaction activity over time
                </CardDescription>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Time Range
                  </label>
                  <Select
                    value={transactionTimeSeriesFilters.time_range}
                    onValueChange={handleTransactionTimeRangeChange}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1d">1 Day</SelectItem>
                      <SelectItem value="7d">7 Day</SelectItem>
                      <SelectItem value="1m">1 Month</SelectItem>
                      <SelectItem value="3m">3 Months</SelectItem>
                      <SelectItem value="6m">6 Month</SelectItem>
                      <SelectItem value="1y">1 Year</SelectItem>
                      <SelectItem value="2y">2 Year</SelectItem>
                      <SelectItem value="5y">5 Year</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {transactionTimeSeriesFilters.time_range === "custom" && (
                  <>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        Start Date
                      </label>
                      <Input
                        type="date"
                        value={transactionTimeSeriesFilters.start_date || ""}
                        onChange={(e) =>
                          handleTransactionDateChange(
                            "start_date",
                            e.target.value
                          )
                        }
                        className="w-[150px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        End Date
                      </label>
                      <Input
                        type="date"
                        value={transactionTimeSeriesFilters.end_date || ""}
                        onChange={(e) =>
                          handleTransactionDateChange(
                            "end_date",
                            e.target.value
                          )
                        }
                        className="w-[150px]"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Frequency
                  </label>
                  <Select
                    value={transactionTimeSeriesFilters.frequency || "daily"}
                    onValueChange={handleTransactionFrequencyChange}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {loadingTransactionTimeSeries ? (
              <ChartSkeleton />
            ) : errorTransactionTimeSeries ? (
              <div className="text-destructive p-4 text-center">
                {errorTransactionTimeSeries}
              </div>
            ) : transactionTimeSeriesData ? (
              <div className="space-y-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={transactionTimeSeriesData.data}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis
                        dataKey="period"
                        tickFormatter={(value) => {
                          return value
                            .split(" to ")[0]
                            .split("-")
                            .slice(1)
                            .join("/");
                        }}
                        className="text-xs"
                      />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                        labelFormatter={(label) => `Period: ${label}`}
                        formatter={(value) => [
                          `${value} transactions`,
                          "Count",
                        ]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        name="Transaction Count"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="px-4 py-1.5">
                    <span className="font-medium">Total Transactions:</span>{" "}
                    {transactionTimeSeriesData.total_candidates}
                  </Badge>
                  <Badge variant="outline" className="px-4 py-1.5">
                    <span className="font-medium">Data Points:</span>{" "}
                    {transactionTimeSeriesData.data_points}
                  </Badge>
                  <Badge variant="outline" className="px-4 py-1.5">
                    <span className="font-medium">Time Range:</span>{" "}
                    {transactionTimeSeriesData.filters.start_date} to{" "}
                    {transactionTimeSeriesData.filters.end_date}
                  </Badge>
                  <Badge variant="outline" className="px-4 py-1.5">
                    <span className="font-medium">Frequency:</span>{" "}
                    {transactionTimeSeriesData.filters.frequency || "Daily"}
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                No transaction time series data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Skeleton loading components
const CardSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-3">
    <div className="h-4 bg-muted rounded w-3/4"></div>
    <div className="h-6 bg-muted rounded w-1/2"></div>
  </div>
);

const ChartSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4">
    <div className="flex justify-between">
      <div className="h-4 bg-muted rounded w-1/4"></div>
      <div className="h-4 bg-muted rounded w-1/4"></div>
      <div className="h-4 bg-muted rounded w-1/4"></div>
    </div>
    <div className="h-64 bg-muted rounded-lg"></div>
  </div>
);

export default AdminDashboard;
