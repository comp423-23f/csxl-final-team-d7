% Example values
t = 10;      % time parameter
b = 2;       % coefficient
D = [5, 8];  % vector of deadlines for each task
p = [20, 10]; % vector of periods for each task
e = [3, 5];   % vector of resource demands for each task

% Call the function
result = h_function(t, b, D, p, e);

% Display the result
disp(['h(t) = ', num2str(result)]);